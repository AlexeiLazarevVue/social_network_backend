import {Injectable, Logger} from '@nestjs/common';
import {User} from "../../entity/User";
import {QueryFailedError} from "typeorm";
import {AppError} from "../../errors";
import {UserToken, UserTokenType} from "../../entity/UserToken";
import {raceInit} from "rxjs/internal/observable/race";


@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name)

    /**
     * Пробуем создать пользователя с почтой и указанным паролем и если создали - отправляем на почту ссылку на
     * подтверждение аккаунта
     *
     * @param email
     * @param password
     */
    async tryCreateUser(email: string, password: string): Promise<User> {
        try {
            let new_user = new User()

            new_user.email = email
            new_user.password = User.hashPassword(password)

            await new_user.save()

            let token = new UserToken()
            token.user = new_user
            token.type = UserTokenType.JoinConfirmation
            await token.save()

            this.logger.debug(`E-Mail: For user ${new_user.email} token is ${token.token}`)

            return new_user
        } catch (e) {
            if (e instanceof QueryFailedError && e.message == 'SQLITE_CONSTRAINT: UNIQUE constraint failed: user.email') {
                throw new AppError('Пользователь с такой почтой уже есть')
            } else {
                throw e
            }
        }
    }

    /**
     * Пробуем подтвердить почту пользователя по токену
     * @param token
     */
    async tryConfirmAccount(token: string) {
        let userToken = await UserToken.findOneBy({
            token: token,
            type: UserTokenType.JoinConfirmation,
        })

        if (!userToken) {
            throw new AppError('Токен не найден');
        }

        userToken.user.activated = true

        await userToken.user.save()

        await UserToken.delete(userToken.id)
    }

    /**
     * Авторизация пользователя в системе. Если авторизовали - возвращаем токен
     * @param email
     * @param password
     */
    async tryToLogin(email: string, password: string): Promise<UserToken> {
        let user = await User.findOneBy({
            email,
            password: User.hashPassword(password),
            activated: true
        })

        if (!user)
            throw new AppError('Авторизация не выполнена')

        return await UserToken.retrieveForUser(user)
    }
}

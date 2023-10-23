import {Body, Controller, Post, Request, UseGuards} from '@nestjs/common';
import {PasswordDTO, UserConfirmEmailDTO, UserCredentialsDTO} from "./user.dto";
import {UserService} from "./user.service";
import {AuthGuard} from "./user.guard";
import {User} from "../../entity/User";


@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('join')
    async join(@Body() userCredentialsDTO: UserCredentialsDTO) {
        await this.userService.tryCreateUser(userCredentialsDTO.email, userCredentialsDTO.password)
    }

    @Post('confirm-email')
    async confirmEmail(@Body() userConfirmEmailDTO: UserConfirmEmailDTO) {
        await this.userService.tryConfirmAccount(userConfirmEmailDTO.token)
    }

    @Post('login')
    async login(@Body() userCredentialsDTO: UserCredentialsDTO) {
        let userToken = await this.userService.tryToLogin(userCredentialsDTO.email, userCredentialsDTO.password)

        return {
            'token': userToken.token
        }
    }

    /**
     * Обновляет пароль авторизованного пользователя на указанный
     * @param req
     * @param passwordDTO
     */
    @UseGuards(AuthGuard)
    @Post('set-new-password')
    async setNewPassword(@Request() req, @Body() passwordDTO: PasswordDTO) {
        req.user.password = User.hashPassword(passwordDTO.password)
        await req.user.save()
    }
}

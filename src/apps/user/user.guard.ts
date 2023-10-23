import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {Request} from "express";
import {UserToken, UserTokenType} from "../../entity/UserToken";


@Injectable()
export class AuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        let request = context.switchToHttp().getRequest()
        let token = this.parseToken(request)

        if (!token)
            return false

        let userToken = await UserToken.findOneBy({
            token: token,
            type: UserTokenType.Session
        })

        if (!userToken)
            return false

        request.user = userToken.user

        return true
    }

    private parseToken(request: Request): string | void {
        let [type, token] = request.headers.authorization?.split(' ') ?? []

        if (type == 'Token')
            return token
    }
}
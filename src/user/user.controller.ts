import {Body, Controller, Post} from '@nestjs/common';
import {UserJoinDTO} from "./user.dto";
import {UserService} from "./user.service";


@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('join')
    async join(@Body() userJoinDTO: UserJoinDTO) {
        await this.userService.tryCreateUser(userJoinDTO.email, userJoinDTO.password)
    }
}

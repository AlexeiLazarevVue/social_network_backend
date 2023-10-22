import { Injectable } from '@nestjs/common';
import {User} from "../entity/User";


@Injectable()
export class UserService {
    async tryCreateUser(email: string, password: string): Promise<User> {
        let new_user = new User()

        new_user.email = email
        new_user.password = User.hashPassword(password)

        await new_user.save()

        return new_user
    }
}

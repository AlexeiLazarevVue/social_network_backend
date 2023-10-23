import {IsEmail, IsNotEmpty, IsString, Length} from "class-validator";

export class PasswordDTO {
    @IsNotEmpty()
    @IsString()
    password: string
}

export class UserCredentialsDTO extends PasswordDTO {
    @IsEmail()
    email: string
}


export class UserConfirmEmailDTO {
    @IsString()
    @IsNotEmpty()
    @Length(64, 64)
    token: string
}

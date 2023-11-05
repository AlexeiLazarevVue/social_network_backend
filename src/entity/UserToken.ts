import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";

import {User} from "./User";

export enum UserTokenType {
    JoinConfirmation,
    PasswordResetConfirmation,
    Session
}


function generateToken(length: number) {
    let str = '';
    const ALPHABET = '0123456789qazwsxedcrfvtgbyhnujmikolpQAZWSXEDCRFVTGBYHNUJMIKOLP_.'

    for (let i = 0; i < length; i++)
        str += ALPHABET[Math.round(Math.random() * (ALPHABET.length - 1))]

    return str
}


@Entity()
export class UserToken extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "integer", nullable: false})
    userId: number

    @ManyToOne(type => User, user => user.tokens, {cascade: true, eager: true})
    @JoinColumn({name: 'userId'})
    user: User

    @Column({nullable: false})
    type: UserTokenType

    @Column({nullable: false, default: 'CURRENT_TIMESTAMP'})
    expires: Date

    @Column({length: 64})
    token: string = generateToken(64)

    static async retrieveForUser(user: User): Promise<UserToken> {
        let token = await UserToken.findOneBy({
            userId: user.id,
            type: UserTokenType.Session,
        })

        if (!token) {
            token = new UserToken()
            token.user = user
            token.type = UserTokenType.Session
            await token.save()
        }

        return token
    }
}

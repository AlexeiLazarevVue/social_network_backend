import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany} from "typeorm"
import md5 from "md5";
import {UserToken, UserTokenType} from "./UserToken";
import {Friend} from "./Friend";
import {FriendRequest} from "./FriendRequest";


@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 255, unique: true})
    email: string

    @Column({length: 32, nullable: false})
    password: string

    @Column({default: false})
    activated: boolean

    @OneToMany(type => UserToken, userToken => userToken.user)
    tokens: UserToken[]

    @OneToMany(type => Friend, friend => friend.user)
    friends: Friend[]

    @OneToMany(type => FriendRequest, friendRequest => friendRequest.fromUser)
    friendOutgoingRequests: FriendRequest[]

    @OneToMany(type => FriendRequest, friendRequest => friendRequest.toUser)
    friendIncomingRequests: FriendRequest[]

    /**
     * Возвращает хэшированный пароль для хранения в базе
     * @param password
     */
    static hashPassword(password: string) {
        return md5(password);
    }
}
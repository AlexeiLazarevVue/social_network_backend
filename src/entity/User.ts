import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany} from "typeorm"
import md5 from "md5";
import {UserToken, UserTokenType} from "./UserToken";
import {Friend} from "./Friend";
import {FriendRequest} from "./FriendRequest";
import {Message} from "./Message";
import {Post} from "./Post";


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

    @OneToMany(type => FriendRequest, friendRequest => friendRequest.targetUser)
    friendIncomingRequests: FriendRequest[]

    @OneToMany(type => Message, message => message.user)
    outgoingMessages: Message[]

    @OneToMany(type => Message, message => message.targetUser)
    incomingMessages: Message[]

    @OneToMany(type => Post, post => post.user)
    posts: Post[]



    /**
     * Возвращает хэшированный пароль для хранения в базе
     * @param password
     */
    static hashPassword(password: string) {
        return md5(password);
    }
}
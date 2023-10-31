import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";

@Entity()
export class FriendRequest {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    fromUserId: number

    @ManyToOne(type => User, user => user.friendOutgoingRequests, {cascade: true, eager: true})
    @JoinColumn({name: 'fromUserId'})
    fromUser: User

    @Column()
    toUserId: number

    @ManyToOne(type => User, user => user.friendIncomingRequests, {cascade: true, eager: true})
    @JoinColumn({name: 'fromUserId'})
    toUser: User
}
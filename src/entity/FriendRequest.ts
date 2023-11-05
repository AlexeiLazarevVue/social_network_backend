import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";

@Entity()
export class FriendRequest extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    fromUserId: number

    @ManyToOne(type => User, user => user.friendOutgoingRequests, {cascade: true, eager: true})
    @JoinColumn({name: 'fromUserId'})
    fromUser: User

    @Column()
    targetUserId: number

    @ManyToOne(type => User, user => user.friendIncomingRequests, {cascade: true, eager: true})
    @JoinColumn({name: 'targetUserId'})
    targetUser: User
}
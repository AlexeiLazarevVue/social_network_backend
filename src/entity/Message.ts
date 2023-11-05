import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";

@Entity()
export class Message extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    content: string

    @Column()
    userId: number

    @ManyToOne(type => User, user => user.outgoingMessages, {cascade: true, eager: true})
    @JoinColumn({name: 'userId'})
    user: User

    @Column()
    targetUserId: number

    @ManyToOne(type => User, user => user.incomingMessages, {cascade: true, eager: true})
    @JoinColumn({name: 'targetUserId'})
    targetUser: User
}
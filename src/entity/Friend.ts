import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";

@Entity()
export class Friend {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    userId: number

    @ManyToOne(type => User, user => user.friends, {cascade: true, eager: true})
    @JoinColumn({name: 'userId'})
    user: User

    @Column()
    targetUserId: number

    @ManyToOne(type => User, null, {cascade: true, eager: true})
    @JoinColumn({name: 'targetUserId'})
    targetUser: User
}
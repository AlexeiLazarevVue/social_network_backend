import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";

@Entity()
export class Post extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    userId: number

    @ManyToOne(type => User, user => user.posts, {cascade: true, eager: true})
    @JoinColumn({name: 'userId'})
    user: User

    @Column()
    content: string

    @Column()
    createdAt: string
}
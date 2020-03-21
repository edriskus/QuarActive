import { Entity, Column, Index, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { GenericEntity } from './GenericEntity';
import { TaskStatus, Difficulty } from './enums';
import { UserTaskStatus } from './UserTaskStatus';

@Entity()
@ObjectType()
export class Task extends GenericEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field(() => String)
    @Column()
    title: string;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    description: string;

    @Field(() => Difficulty, { defaultValue: 0 })
    @Column({ enum: Difficulty, default: 0 })
    difficulty: Difficulty;

    @Field(() => TaskStatus, { defaultValue: 0 })
    status: TaskStatus;

    @OneToMany(() => UserTaskStatus, userTaskStatus => userTaskStatus.taskId)
    userTaskStatus!: UserTaskStatus[];
}

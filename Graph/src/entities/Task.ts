import { Entity, Column, Index, PrimaryGeneratedColumn, OneToMany, JoinColumn, OneToOne } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { GenericEntity } from './GenericEntity';
import { TaskStatus, Difficulty } from './enums';
import { UserTaskStatus } from './UserTaskStatus';
import { Translation } from './Translation';
import { Checkpoint } from './Checkpoint';

@Entity()
@ObjectType()
export class Task extends GenericEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field(() => Translation, { nullable: true })
    @OneToOne(() => Translation, { nullable: true, lazy: true })
    @JoinColumn()
    title: Translation;

    @Field(() => Translation, { nullable: true })
    @OneToOne(() => Translation, { nullable: true, lazy: true })
    @JoinColumn()
    description: Translation;

    @Field(() => Number)
    @Column({ default: 0 })
    amount: number;

    @Field(() => Difficulty, { defaultValue: 0 })
    @Column({ enum: Difficulty, default: 0 })
    difficulty: Difficulty;

    @Field(() => TaskStatus, { defaultValue: 0 })
    status: TaskStatus;

    @OneToMany(() => UserTaskStatus, userTaskStatus => userTaskStatus.taskId)
    userTaskStatus!: UserTaskStatus[];

    @Field(() => [Checkpoint])
    @OneToMany(() => Checkpoint, checkpoint => checkpoint.task, { nullable: true, lazy: true })
    checkpoints!: Checkpoint[];
}

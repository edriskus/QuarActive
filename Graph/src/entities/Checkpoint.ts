import { Entity, Column, Index, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, ManyToOne } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { GenericEntity } from './GenericEntity';
import { TaskStatus, Difficulty } from './enums';
import { CheckpointStatus } from './enums/CheckpointStatus';
import { Translation } from './Translation';
import { UserCheckpointStatus } from './UserCheckpointStatus';
import { Task } from './Task';

@Entity()
@ObjectType()
export class Checkpoint extends GenericEntity {
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

    @Field(() => CheckpointStatus, { defaultValue: 0 })
    status: CheckpointStatus;

    @OneToMany(() => UserCheckpointStatus, userCheckpointStatus => userCheckpointStatus.checkpointId)
    userCheckpointStatus!: UserCheckpointStatus[];

    @Column()
    taskId!: string;

    @ManyToOne(() => Task, task => task.checkpoints)
    task!: Task;
}

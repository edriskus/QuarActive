import { Entity, Column, Index, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { GenericEntity } from './GenericEntity';
import { TaskStatus, Difficulty } from './enums';
import { CheckpointStatus } from './enums/CheckpointStatus';

@Entity()
@ObjectType()
export class Checkpoint extends GenericEntity {
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

    @Field(() => CheckpointStatus, { defaultValue: 0 })
    @Column({ enum: CheckpointStatus, default: 0 })
    status: CheckpointStatus;
}

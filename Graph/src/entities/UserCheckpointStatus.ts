import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { GenericEntity } from './GenericEntity';
import { CheckpointStatus } from './enums';
import { User } from './User';
import { Checkpoint } from './Checkpoint';

@Entity()
@ObjectType()
export class UserCheckpointStatus extends GenericEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    public userId!: string;
    
    @Column()
    public checkpointId!: string;
   
    @Field(() => CheckpointStatus, { defaultValue: 0 })
    @Column({ enum: CheckpointStatus, default: 0 })
    public status: CheckpointStatus;

    @ManyToOne(() => User, user => user.id)
    public user!: User;

    @ManyToOne(() => Checkpoint, checkpoint => checkpoint.id)
    public checkpoint!: Checkpoint;
}

import { Entity, Column, Index, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { GenericEntity } from './GenericEntity';
import { TaskStatus, Difficulty } from './enums';
import { User } from './User';
import { Task } from './Task';

@Entity()
@ObjectType()
export class UserTaskStatus extends GenericEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    public userId!: string;
    
    @Column()
    public taskId!: string;
   
    @Field(() => TaskStatus, { defaultValue: 0 })
    @Column({ enum: TaskStatus, default: 0 })
    public status: TaskStatus;

    @ManyToOne(() => User, user => user.id)
    public user!: User;

    @ManyToOne(() => Task, task => task.id)
    public task!: Task;
}

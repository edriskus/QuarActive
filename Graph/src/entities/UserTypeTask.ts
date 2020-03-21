import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { GenericEntity } from './GenericEntity';
import { PersonalityTraitEnum, UserType } from './enums'; 
import { Task } from './Task';

@Entity()
@ObjectType()
export class UserTypeTask extends GenericEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    public taskId!: string;
    
    @Field(() => UserType, { defaultValue: 0 })
    @Column({ enum: UserType, default: 0 })
    public userType: UserType;

    @ManyToOne(() => Task, task => task.id)
    public task!: Task;
}

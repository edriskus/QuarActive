import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { GenericEntity } from './GenericEntity';
import { PersonalityTraitEnum } from './enums'; 
import { Task } from './Task';

@Entity()
@ObjectType()
export class PersonalityTaskTrait extends GenericEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    public taskId!: string;
    
    @Field(() => PersonalityTraitEnum, { defaultValue: 0 })
    @Column({ enum: PersonalityTraitEnum, default: 0 })
    public personalityTrait: PersonalityTraitEnum;

    @ManyToOne(() => Task, task => task.id)
    public task!: Task;
}

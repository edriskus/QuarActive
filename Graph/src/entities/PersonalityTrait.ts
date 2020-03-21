import { Entity, Column, Index, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { GenericEntity } from './GenericEntity';
import { TaskStatus, PersonalityTraitEnum } from './enums';
import { User } from './User';
import { Task } from './Task';

@Entity()
@ObjectType()
export class PersonalityTrait extends GenericEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    public userId!: string;
    
   
    @Field(() => PersonalityTraitEnum, { defaultValue: 0 })
    @Column({ enum: PersonalityTraitEnum, default: 0 })
    public personalityTrait: PersonalityTraitEnum;

    @ManyToOne(() => User, user => user.id)
    public user!: User;
}

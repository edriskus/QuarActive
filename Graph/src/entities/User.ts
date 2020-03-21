import { Entity, Column, Index, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { GenericEntity } from './GenericEntity';
import { UserType } from './enums';
import { UserTaskStatus } from './UserTaskStatus';
@Entity()
@ObjectType()
export class User extends GenericEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field(() => String)
    @Column()
    @Index({ unique: true })
    email: string;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    displayName: string;

    @Column({ length: 64 })
    password: string;

    @Field(() => Number, { defaultValue: 0 })
    @Column({ default: 0 })
    balance: number;
    
    @Field(() => UserType, { defaultValue: 0 })
    @Column({ enum: UserType, default: 0 })
    type: UserType;

    @OneToMany(() => UserTaskStatus, userTaskStatus => userTaskStatus.userId)
    userTaskStatus!: UserTaskStatus[];
}

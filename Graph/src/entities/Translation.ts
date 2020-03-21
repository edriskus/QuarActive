import { Entity, Column, Index, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { GenericEntity } from './GenericEntity';

@Entity()
@ObjectType()
export class Translation extends GenericEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    lt: string;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    en: string;
}

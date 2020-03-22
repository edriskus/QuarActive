import { registerEnumType } from 'type-graphql';

export enum PersonalityTraitEnum {
    Fitness = 0,
    Cooking = 1,
    Travel = 2,
    Books = 3,
    Music = 4,
    Games = 5,
    Pets = 6,
    Kids = 7
}

registerEnumType(PersonalityTraitEnum, {
    name: 'PersonalityTraitEnum',
});

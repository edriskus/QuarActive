import { registerEnumType } from 'type-graphql';

export enum PersonalityTraitEnum {
    BookLover = 0,
    Traveller = 1
}

registerEnumType(PersonalityTraitEnum, {
    name: 'PersonalityTraitEnum',
});

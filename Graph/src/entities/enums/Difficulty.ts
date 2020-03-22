import { registerEnumType } from 'type-graphql';

export enum Difficulty {
    Easy = 0,
    Medium = 1,
    Hard = 2
}

registerEnumType(Difficulty, {
    name: 'Difficulty',
});

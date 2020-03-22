import { registerEnumType } from 'type-graphql';

export enum UserType {
    Teen = 0,
    Young = 1,
    Family = 2,
}

registerEnumType(UserType, {
    name: 'UserType',
});

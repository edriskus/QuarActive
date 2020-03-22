import { registerEnumType } from 'type-graphql';

export enum CheckpointStatus {
    ToDo = 0,
    InProgress = 1,
    Done = 2,
}

registerEnumType(CheckpointStatus, {
    name: 'CheckpointStatus',
});

import { registerEnumType } from 'type-graphql';

export enum TaskStatus {
    ToDo = 0,
    InProgress = 1,
    Done = 2,
}

registerEnumType(TaskStatus, {
    name: 'TaskStatus',
});

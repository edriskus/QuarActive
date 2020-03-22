import Container from 'typedi';
import { ResolverData, buildSchema } from 'type-graphql';
import {
    UserResolver, TaskResolver, CheckpointResolver
} from '../resolvers';
import { Context } from '../types';

export const createSchema = () =>
    buildSchema({
        resolvers: [
            UserResolver,
            CheckpointResolver,
            TaskResolver
        ],
        container: ({ context }: ResolverData<Context>) =>
            Container.of(context.requestId),
        authChecker: ({ context }) =>  context.user ? true : false,
    });

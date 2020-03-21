import Container from 'typedi';
import { ResolverData, buildSchema } from 'type-graphql';
import { getUserFromToken } from './getUserFromToken';
import {
    UserResolver
} from '../resolvers';
import { Context } from '../types';
import { User } from '../../entities';

export const createSchema = () =>
    buildSchema({
        resolvers: [
            UserResolver
        ],
        container: ({ context }: ResolverData<Context>) =>
            Container.of(context.requestId),
        authChecker: ({ context }) =>  context.user ? true : false,
    });

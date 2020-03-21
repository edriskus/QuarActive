import { Resolver, Mutation, Arg, Query, Authorized, Ctx } from 'type-graphql';
import { Service } from 'typedi';
import { User } from '../../entities';
import sha256 from 'sha256';
import { LoginInput, RegisterInput } from '../inputs';
import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { UserService } from '../../services';
import { AuthResponse, Context } from '../types';

@Service()
@Resolver()
export class UserResolver {
    constructor(private userService: UserService) {}

    @Authorized()
    @Query(() => [User])
    async getUsers() {
        const users = await this.userService.getUsers();
        return users;
    }

    @Authorized()
    @Query(() => User)
    async getCurrentUser(@Ctx() context: Context) {
        const user = await User.findOne(context.user.id);
        return user;
    }

    @Mutation(() => AuthResponse)
    async register(@Arg('data') data: RegisterInput) {
        data.password = sha256(data.password);
        const user = User.create(data);
        await user.save();
        return {
            user,
            token: jwt.sign({ ...user }, config.JWT_SECRET),
        };
    }

    @Mutation(() => AuthResponse)
    async login(@Arg('data') data: LoginInput) {
        const user = await User.findOne({ where: { email: data.email } });
        if (user?.password !== sha256(data.password)) {
            throw new GraphQLError("Password doesn't match");
        }
        delete user.password;
        return {
            user,
            token: jwt.sign({ ...user }, config.JWT_SECRET),
        };
    }
}

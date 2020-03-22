import {
  Resolver,
  Mutation,
  Arg,
  Query,
  Authorized,
  Ctx,
  FieldResolver,
  Root
} from "type-graphql";
import { Service } from "typedi";
import { User, PersonalityTrait } from "../../entities";
import sha256 from "sha256";
import { LoginInput, RegisterInput } from "../inputs";
import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { UserService } from "../../services";
import { AuthResponse, Context } from "../types";
import { PersonalityTraitEnum, UserType } from "../../entities/enums";

@Service()
@Resolver(() => User)
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
  async register(@Arg("data") data: RegisterInput) {
    data.password = sha256(data.password);
    const personalityTraits = data.personalityTraits;
    // this.
    const { email, password, displayName, type } = data;
    let user = User.create({
      email,
      password,
      displayName,
      type
    });
    user = await user.save();
    user = await this.savePersonalityTraits(personalityTraits, user.id);
    return {
      user,
      token: jwt.sign({ ...user }, config.JWT_SECRET)
    };
  }

  @Mutation(() => AuthResponse)
  async login(@Arg("data") data: LoginInput) {
    const user = await User.findOne({ where: { email: data.email } });
    if (user?.password !== sha256(data.password)) {
      throw new GraphQLError("Password doesn't match");
    }
    delete user.password;
    return {
      user,
      token: jwt.sign({ ...user }, config.JWT_SECRET)
    };
  }

  @Authorized()
  @Mutation(() => User)
  async changeUserType(@Arg('type', () => UserType) userType: UserType, @Ctx() context: Context) {
      const user = await User.findOne(context.user.id);
      if (user) {
        user.type = userType;
        return await user?.save();
      }
      return null;
  }

  async savePersonalityTraits(
    traits: PersonalityTraitEnum[],
    userId: string
  ): Promise<User> {
    const personalityTraits = await PersonalityTrait.find({
      where: { userId }
    });
    const personalityTraitsToRemove = personalityTraits.filter(
      trait => !traits.includes(trait.personalityTrait)
    );
    await PersonalityTrait.remove(personalityTraitsToRemove);
    const promises = traits.map(async trait => {
      if (!personalityTraits.map(p => p.personalityTrait).includes(trait)) {
        const personalityTrait = new PersonalityTrait();
        personalityTrait.userId = userId;
        personalityTrait.personalityTrait = trait;
        return personalityTrait.save();
      }
      return Promise.resolve();
    });
    await Promise.all(promises);
    return await User.findOne(userId) as User;
  }

  @Authorized()
  @Mutation(() => User)
  async setPersonalityTraits(
    @Arg("traits", () => [PersonalityTraitEnum]) traits: PersonalityTraitEnum[],
    @Ctx() context: Context
  ) {
    return this.savePersonalityTraits(traits, context.user.id);
  }

  @FieldResolver(() => [PersonalityTraitEnum])
  async personalityTraits(@Root() user: User) {
    const personalityTraits = await PersonalityTrait.find({
      where: { userId: user.id }
    });
    return personalityTraits.map(p => p.personalityTrait);
  }
}

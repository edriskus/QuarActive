import { InputType, Field } from "type-graphql";
import { UserType } from "../../entities/enums";

@InputType()
export class RegisterInput {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  displayName: string;

  @Field(() => UserType)
  type: UserType;
}

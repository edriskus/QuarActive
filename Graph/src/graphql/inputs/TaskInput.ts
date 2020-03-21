import { InputType, Field } from "type-graphql";
import { Difficulty } from "../../entities/enums";

@InputType()
export class TaskInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => Difficulty)
  difficulty: Difficulty;
}

import { InputType, Field } from "type-graphql";
import { Difficulty } from "../../entities/enums";
import { TranslationInput } from "./TranslationInput";

@InputType()
export class TaskInput {
  @Field()
  title: TranslationInput;

  @Field()
  description: TranslationInput;

  @Field()
  amount: number;

  @Field(() => Difficulty)
  difficulty: Difficulty;
}

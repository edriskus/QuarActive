import { InputType, Field } from "type-graphql";
import { Difficulty } from "../../entities/enums";
import { TranslationInput } from "./TranslationInput";
import { CheckpointInput } from "./CheckpointInput";

@InputType()
export class TaskInput {
  @Field()
  title: TranslationInput;

  @Field()
  description: TranslationInput;

  @Field(() => [CheckpointInput])
  checkpoints: [CheckpointInput];

  @Field()
  amount: number;

  @Field(() => Difficulty)
  difficulty: Difficulty;
}

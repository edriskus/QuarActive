import { InputType, Field } from "type-graphql";
import { TranslationInput } from "./TranslationInput";

@InputType()
export class CheckpointInput {
  @Field()
  title: TranslationInput;

  @Field()
  description: TranslationInput;
}

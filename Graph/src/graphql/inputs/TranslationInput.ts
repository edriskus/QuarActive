import { InputType, Field } from "type-graphql";

@InputType()
export class TranslationInput {
  @Field()
  lt: string;

  @Field()
  en: string;
}

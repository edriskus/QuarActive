import { UserType } from "./Auth";
import { TranslatedString } from "./Translation";

export enum PersonalityTraitType {
  Fitness = "Fitness",
  Cooking = "Cooking",
  Travel = "Travel",
  Books = "Books",
  Music = "Music",
  Games = "Games",
  Pets = "Pets",
  Kids = "Kids"
}

export interface PersonalityTrait {
  title: TranslatedString;
  illustration: string;
  description: TranslatedString;
  type: PersonalityTraitType;
}

export interface Persona {
  title: TranslatedString;
  illustration: string;
  description: TranslatedString;
  type: UserType;
}

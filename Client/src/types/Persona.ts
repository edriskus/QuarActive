import { UserType } from "./Auth";
import { ComponentType } from "react";
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
  illustration: ComponentType;
  description: TranslatedString;
  type: PersonalityTraitType;
}

export interface Persona {
  title: TranslatedString;
  illustration: ComponentType;
  description: TranslatedString;
  type: UserType;
}

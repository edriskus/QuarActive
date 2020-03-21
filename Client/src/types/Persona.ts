import { UserType } from "./Auth";
import { ComponentType } from "react";
import { TranslatedString } from "./Translation";

export interface Persona {
  title: TranslatedString;
  illustration: ComponentType;
  description: TranslatedString;
  type: UserType;
}

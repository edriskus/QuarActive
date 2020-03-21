import { UserType } from "./Auth";
import { ComponentType } from "react";

export interface Persona {
  title: string;
  illustration: ComponentType;
  description: string;
  type: UserType;
}

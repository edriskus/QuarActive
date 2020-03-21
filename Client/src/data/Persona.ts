import { Persona } from "../types/Persona";
import { UserType } from "../types/Auth";
import { ReactComponent as Teenager } from "../illustrations/Teenager.svg";
import { ReactComponent as Adult } from "../illustrations/Adult.svg";

export const personas: Persona[] = [
  {
    title: "Teenager",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
    illustration: Teenager,
    type: UserType.basic
  },
  {
    title: "Adult",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
    illustration: Adult,
    type: UserType.basic
  }
];

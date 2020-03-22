import { Persona } from "../types/Persona";
import { UserType } from "../types/Auth";
import { ReactComponent as Teenager } from "../illustrations/Teenager.svg";
import { ReactComponent as Adult } from "../illustrations/Adult.svg";

export const personas: Persona[] = [
  {
    title: {
      en: "Teenager",
      lt: "Jaunuolis"
    },
    description: {
      en:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
      lt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod."
    },
    illustration: Teenager,
    type: UserType.Teen
  },
  {
    title: {
      en: "Adult",
      lt: "Suaugęs"
    },
    description: {
      en:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
      lt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod."
    },
    illustration: Adult,
    type: UserType.Young
  },
  {
    title: {
      en: "Unicorn",
      lt: "Vienaragis"
    },
    description: {
      en:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
      lt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod."
    },
    illustration: Adult,
    type: UserType.Family
  }
];

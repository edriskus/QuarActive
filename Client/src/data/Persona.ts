import { Persona } from "../types/Persona";
import { UserType } from "../types/Auth";

export const personas: Persona[] = [
  {
    title: {
      en: "Teenager",
      lt: "Jaunuolis"
    },
    description: {
      en:
        "Missing your friends? We feel you! Missing your studies or school? Let’s say we believe you...",
      lt:
        "Pasiilgai savo draugų? Mes tave suprantame! Pasiilgai studijų ar mokyklos? Apsimesime kad patikėjome..."
    },
    illustration: "/assets/Teens.png",
    type: UserType.Teen
  },
  {
    title: {
      en: "Adult",
      lt: "Suaugęs"
    },
    description: {
      en:
        "At last! No need to go to the office or wear pants... or both! Be cool and #StayHome",
      lt:
        "Pagaliau! Nebereikia eiti į ofisą ar dėvėti kelnių... ar abiejų! Ramiai ir #StayHome"
    },
    illustration: "/assets/Adults.png",
    type: UserType.Young
  },
  {
    title: {
      en: "Unicorn",
      lt: "Vienaragis"
    },
    description: {
      en: "Born wild and free, and want some more? So maybe you are Unicorn?",
      lt:
        "Esi laisva ir laukinė siela, visoumet sieki kažko daugiau? Galbūt tu - vienaragis?"
    },
    illustration: "/assets/Unicorn.png",
    type: UserType.Family
  }
];

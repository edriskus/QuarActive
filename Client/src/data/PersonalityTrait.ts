import { PersonalityTrait, PersonalityTraitType } from "../types/Persona";
import { ReactComponent as Adult } from "../illustrations/Adult.svg";

export const personalityTraits: PersonalityTrait[] = [
  {
    title: {
      en: "Fitness",
      lt: "Sportas"
    },
    description: {
      en:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
      lt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod."
    },
    illustration: Adult,
    type: PersonalityTraitType.Fitness
  },
  {
    title: {
      en: "Cooking",
      lt: "Maisto gaminimas"
    },
    description: {
      en:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
      lt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod."
    },
    illustration: Adult,
    type: PersonalityTraitType.Cooking
  },
  {
    title: {
      en: "Travel",
      lt: "Kelionės"
    },
    description: {
      en:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
      lt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod."
    },
    illustration: Adult,
    type: PersonalityTraitType.Travel
  },

  {
    title: {
      en: "Books",
      lt: "Knygos"
    },
    description: {
      en:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
      lt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod."
    },
    illustration: Adult,
    type: PersonalityTraitType.Books
  },

  {
    title: {
      en: "Music",
      lt: "Muzika"
    },
    description: {
      en:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
      lt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod."
    },
    illustration: Adult,
    type: PersonalityTraitType.Music
  },

  {
    title: {
      en: "Games",
      lt: "Žaidimai"
    },
    description: {
      en:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
      lt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod."
    },
    illustration: Adult,
    type: PersonalityTraitType.Games
  },

  {
    title: {
      en: "Pets",
      lt: "Naminiai gyvūnai"
    },
    description: {
      en:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
      lt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod."
    },
    illustration: Adult,
    type: PersonalityTraitType.Pets
  },

  {
    title: {
      en: "Kids activities",
      lt: "Veikla vaikams"
    },
    description: {
      en:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
      lt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod."
    },
    illustration: Adult,
    type: PersonalityTraitType.Kids
  }
];

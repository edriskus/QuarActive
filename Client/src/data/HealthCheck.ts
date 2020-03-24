import { Question } from "../types/Question";

enum HCQ {
  howAreYou = "howAreYou",
  whatHappened = "whatHappened"
}

export const HowAreYou: Question = {
  id: HCQ.howAreYou,
  title: {
    en: "Morning!",
    lt: "Labas rytas!"
  },
  description: {
    en: "Hey, how are you today? Feeling good?",
    lt: "Kaip jautiesi šiandien? Viskas gerai?"
  },
  answers: [
    {
      title: {
        en: "Yep!",
        lt: "Taip!"
      },
      illustration: "/assets/FeelGood.svg",
      halt: {
        en: "Cool, let's do something fun then!",
        lt: "Puiku, eime nuveikti ką nors smagaus!"
      }
    },
    {
      title: {
        en: "Nope :(",
        lt: "Nelabai :("
      },
      chainId: HCQ.whatHappened,
      illustration: "/assets/FeelSad.svg"
    }
  ]
};

export const WhatHappened: Question = {
  id: HCQ.whatHappened,
  title: {
    en: "Oh no, what happened?",
    lt: "O ne, kas nutiko?"
  },
  answers: [
    {
      title: {
        en: "I feel sick",
        lt: "Nekaip jaučiuosi"
      },
      taskId: "checkHealth",
      halt: {
        en:
          "Damn! Ok, we have a challenge for you then, let's take it under control!",
        lt: "Negerai! Na, tuomet turime tau užduotį, įveikime ją kartu!"
      },
      illustration: "/assets/Health.png"
    },
    {
      title: {
        en: "I'm just sad",
        lt: "Man tiesiog liūdna"
      },
      halt: {
        en:
          "Sorry ho hear :( We have a challenge for you then, let's take it under control!",
        lt: "Užjaučiame :( Tačiau turime tau užduotį, įveikime ją kartu!"
      },
      illustration: "/assets/FeelSad.svg"
    },
    {
      title: {
        en: "Nevermind",
        lt: "Nieko tokio"
      },
      halt: {
        en: "Ok, goccha! Let's continue, then?",
        lt: "Gerai, supratome! Judėkime pirmyn?"
      },
      illustration: "/assets/Nevermind.svg"
    }
  ]
};

export const HealthCheckQuestions: Record<HCQ, Question> = {
  [HCQ.howAreYou]: HowAreYou,
  [HCQ.whatHappened]: WhatHappened
};

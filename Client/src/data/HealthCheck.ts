import { Question } from "../types/Question";
import { Task, Difficulty, CheckpointStatus } from "../types/Task";

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

export const HealthCheckTask: Task = {
  id: "checkHealth",
  offline: true,
  title: {
    en: "Check your health",
    lt: ""
  },
  description: {
    en: "Take your time to check your health",
    lt: ""
  },
  cover: "/assets/Health.png",
  difficulty: Difficulty.easy,
  checkpoints: [
    {
      id: "1",
      order: 1,
      status: CheckpointStatus.toDo,
      title: {
        en: "Measure it!",
        lt: ""
      },
      description: {
        en:
          "Grab your thermometer and... well, we hope you know how to use it :)",
        lt: ""
      }
    },
    {
      id: "2",
      order: 2,
      status: CheckpointStatus.toDo,
      title: {
        en: "And now",
        lt: ""
      },
      description: {
        en: `Check - do you have dry cough? 
        
Just a reminder – if you have high temperature and dry cough, please **call to the medical institution** and ask for further instructions.`,
        lt: ""
      }
    }
  ]
};

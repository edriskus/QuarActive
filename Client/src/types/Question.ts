import { TranslatedString } from "./Translation";

export interface Question {
  id: string;
  title: TranslatedString;
  description?: TranslatedString;
  helpText?: TranslatedString;
  answers: Answer[];
}

export interface Answer {
  title: TranslatedString;
  description?: TranslatedString;
  illustration: string;
  chainId?: string;
  taskId?: string;
  halt?: TranslatedString;
}

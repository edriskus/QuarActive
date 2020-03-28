import { Dispatch, SetStateAction, ChangeEvent } from "react";
import { ValidationError } from "yup";
import { Locale, TranslatedString } from "../types/Translation";

export const handleChange = (setter: Dispatch<SetStateAction<string>>) => (
  event: ChangeEvent<HTMLInputElement>
) => {
  const value = event.target?.value;
  if (typeof value === "string") {
    setter(value);
  }
};

export const handleTranslatedChange = (
  setter: Dispatch<SetStateAction<TranslatedString>>,
  locale: Locale
) => (event: ChangeEvent<HTMLInputElement>) => {
  const value = event.target?.value;
  if (typeof value === "string") {
    setter(prev => ({
      ...prev,
      [locale]: value
    }));
  }
};

export const findError = (errors: ValidationError[], name: string) => {
  return errors.find(error => error.path === name);
};

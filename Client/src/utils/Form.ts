import { Dispatch, SetStateAction, ChangeEvent } from "react";
import { ValidationError } from "yup";

export const handleChange = (setter: Dispatch<SetStateAction<string>>) => (
  event: ChangeEvent<HTMLInputElement>
) => {
  setter(event.target.value);
};

export const findError = (errors: ValidationError[], name: string) => {
  return errors.find(error => error.path === name);
};

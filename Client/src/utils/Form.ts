import { Dispatch, SetStateAction, ChangeEvent } from "react";

export const handleChange = (setter: Dispatch<SetStateAction<string>>) => (
  event: ChangeEvent<HTMLInputElement>
) => {
  setter(event.target.value);
};

import React from "react";
import { Difficulty as DifficultyEnum, TaskStatus } from "../../types/Task";
import { ReactComponent as MediumPaper } from "../../illustrations/MediumPaper.svg";
import { ReactComponent as HardPaper } from "../../illustrations/HardPaper.svg";
import { ReactComponent as EasyPaper } from "../../illustrations/EasyPaper.svg";
import { Check } from "@material-ui/icons";

interface Props {
  difficulty: DifficultyEnum;
  status?: TaskStatus;
}

export default function Difficulty({ difficulty, status }: Props) {
  if (status === TaskStatus.done) {
    return <Check style={{ height: "40%", width: "40%" }} />;
  } else {
    return difficulty === DifficultyEnum.easy ? (
      <EasyPaper height="30%" width="30%" />
    ) : difficulty === DifficultyEnum.medium ? (
      <MediumPaper height="70%" width="70%" />
    ) : (
      <HardPaper height="70%" width="70%" />
    );
  }
}

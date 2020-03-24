import React from "react";
import { Difficulty as DifficultyEnum, TaskStatus } from "../../types/Task";
import MediumPaper from "../../illustrations/2papers.png";
import HardPaper from "../../illustrations/3papers.png";
import EasyPaper from "../../illustrations/1paper.png";
import { Check, PriorityHigh } from "@material-ui/icons";

interface Props {
  priority?: boolean;
  status?: TaskStatus;
  difficulty: DifficultyEnum;
}

export default function Difficulty({ difficulty, status, priority }: Props) {
  if (status === TaskStatus.done) {
    return <Check style={{ height: "40%", width: "40%" }} />;
  } else if (priority) {
    return <PriorityHigh style={{ height: "40%", width: "40%" }} />;
  } else {
    return difficulty === DifficultyEnum.easy ? (
      <img alt="1" src={EasyPaper} height="auto" width="30%" />
    ) : difficulty === DifficultyEnum.medium ? (
      <img alt="2" src={MediumPaper} height="auto" width="70%" />
    ) : (
      <img alt="3" src={HardPaper} height="auto" width="70%" />
    );
  }
}

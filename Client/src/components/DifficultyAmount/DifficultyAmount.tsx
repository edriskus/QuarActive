import React from "react";
import { Difficulty as DifficultyEnum } from "../../types/Task";
import { ReactComponent as MediumPaperAmount } from "../../illustrations/MediumPaperAmount.svg";
import { ReactComponent as HardPaperAmount } from "../../illustrations/HardPaperAmount.svg";
import { ReactComponent as EasyPaperAmount } from "../../illustrations/EasyPaperAmount.svg";

interface Props {
  difficulty: DifficultyEnum;
}

export default function DifficultyAmount({ difficulty }: Props) {
  return difficulty === DifficultyEnum.easy ? (
    <EasyPaperAmount />
  ) : difficulty === DifficultyEnum.medium ? (
    <MediumPaperAmount />
  ) : (
    <HardPaperAmount />
  );
}

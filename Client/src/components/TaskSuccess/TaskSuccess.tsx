import React from "react";
import { Box, Typography, IconButton } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import DifficultyAmount from "../DifficultyAmount/DifficultyAmount";
import { ReactComponent as Balloons } from "../../illustrations/Balloons.svg";
import FBShare from "../FBShare/FBShare";
import { Share } from "@material-ui/icons";
import { Difficulty } from "../../types/Task";

interface Props {
  difficulty: Difficulty;
  shareLink: string;
}

export default function TaskSuccess({ difficulty, shareLink }: Props) {
  const { t } = useTranslation();
  return (
    <Box
      display="flex"
      alignItems="center"
      width="100%"
      flexDirection="column"
      paddingY={3}
    >
      <Typography
        variant="h5"
        gutterBottom={true}
        color="primary"
        align="center"
      >
        {t("task.congratsYouReceived")}
        {" + "}
        <DifficultyAmount difficulty={difficulty} />
        {" !"}
      </Typography>
      <Box paddingY={3}>
        <Balloons />
      </Box>
      <Typography variant="h6" color="secondary" align="center">
        {t("task.didYouLike")}
      </Typography>
      <Box paddingY={2} display="flex" alignItems="center">
        <FBShare link={shareLink} />
        <IconButton component="a" target="_blank" href={shareLink}>
          <Share />
        </IconButton>
      </Box>
    </Box>
  );
}

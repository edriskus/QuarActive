import React from "react";
import { Box, Typography, Button, IconButton } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import DifficultyAmount from "../DifficultyAmount/DifficultyAmount";
import FBShare from "../FBShare/FBShare";
import { Share } from "@material-ui/icons";
import { Difficulty } from "../../types/Task";

interface Props {
  difficulty: Difficulty;
  shareLink: string;
}

export default function TaskFinishRegistration({
  difficulty,
  shareLink
}: Props) {
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
        {t("task.congratsLoginPlease")}
        {" + "}
        <DifficultyAmount difficulty={difficulty} />
        {" !"}
      </Typography>
      <Box paddingY={3}>
        <Button
          size="large"
          color="primary"
          variant="contained"
          component={Link}
          to="/onboarding/email"
        >
          {t("task.finishRegistration")}
        </Button>
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

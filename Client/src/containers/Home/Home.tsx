import React from "react";
import { TaskStatus } from "../../types/Task";
import { useTranslation } from "react-i18next";
import { Container, Typography } from "@material-ui/core";

export default function Home() {
  const task: TaskStatus = TaskStatus.done;
  const { t } = useTranslation();
  return (
    <Container>
      <Typography align="center" variant="h1" gutterBottom={true}>
        {t("landing.stuckInQuarantine")}
      </Typography>
      <Typography align="center" variant="body1" gutterBottom={true}>
        {t("landing.storyDescription")}
      </Typography>
    </Container>
  );
}

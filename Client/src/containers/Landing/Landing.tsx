import React from "react";
import { TaskStatus } from "../../types/Task";
import { useTranslation } from "react-i18next";
import { Container, Typography, Box, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function Landing() {
  const task: TaskStatus = TaskStatus.done;
  const { t } = useTranslation();
  return (
    <Container>
      <Box display="flex" justifyContent="center" width="100%" marginTop={2}>
        <img height="200px" alt={t("landing.stuckInQuarantine")} />
      </Box>
      <Typography align="center" variant="h1" gutterBottom={true}>
        {t("landing.stuckInQuarantine")}
      </Typography>
      <Typography align="center" variant="body1" gutterBottom={true}>
        {t("landing.storyDescription")}
      </Typography>
      <Box display="flex" justifyContent="center" width="100%" marginTop={2}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/onboarding"
        >
          {t("landing.challengeAccepted")}
        </Button>
      </Box>
    </Container>
  );
}

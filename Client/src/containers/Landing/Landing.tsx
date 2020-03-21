import React from "react";
import { TaskStatus } from "../../types/Task";
import { useTranslation } from "react-i18next";
import { Container, Typography, Box, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { ReactComponent as LandingIllustration } from "../../illustrations/Landing.svg";

export default function Landing() {
  const task: TaskStatus = TaskStatus.done;
  const { t } = useTranslation();
  return (
    <Container>
      <Box
        display="flex"
        justifyContent="center"
        width="100%"
        paddingY={4}
        marginTop={2}
        paddingX={4}
      >
        <LandingIllustration />
      </Box>
      <Typography
        align="center"
        variant="h3"
        gutterBottom={true}
        color="primary"
      >
        {t("landing.stuckInQuarantine")}
      </Typography>
      <Box display="flex" justifyContent="center" marginTop={4} marginX={3}>
        <Typography align="center" variant="body1" gutterBottom={true}>
          {t("landing.storyDescription")}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" width="100%" marginTop={6}>
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

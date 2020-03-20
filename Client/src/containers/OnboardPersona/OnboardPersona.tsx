import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Typography, Box, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function OnboardPersona() {
  const { t } = useTranslation();
  return (
    <Container>
      <Box display="flex" justifyContent="center" width="100%" marginTop={2}>
        <img height="200px" alt={t("onboarding.task1")} />
      </Box>
      <Typography align="center" variant="h1" gutterBottom={true}>
        {t("onboarding.task1")}
      </Typography>
      <Typography align="center" variant="body1" gutterBottom={true}>
        {t("onboarding.task1Description")}
      </Typography>
      <Box display="flex" justifyContent="center" width="100%" marginTop={2}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/onboarding/email"
        >
          {t("common.next")}
        </Button>
      </Box>
    </Container>
  );
}

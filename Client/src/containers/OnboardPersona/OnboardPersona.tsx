import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Typography, Box } from "@material-ui/core";

export default function OnboardPersona() {
  const { t } = useTranslation();
  return (
    <Container>
      <Typography
        align="center"
        variant="h3"
        gutterBottom={true}
        color="primary"
      >
        {t("onboarding.task1")}
      </Typography>
      <Box display="flex" justifyContent="center" marginTop={4} marginX={3}>
        <Typography align="center" variant="body1" gutterBottom={true}>
          {t("onboarding.task1Description")}
        </Typography>
      </Box>
    </Container>
  );
}

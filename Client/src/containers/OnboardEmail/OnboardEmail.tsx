import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Typography, Box } from "@material-ui/core";

export default function OnboardEmail() {
  const { t } = useTranslation();
  return (
    <Container>
      <Typography
        align="center"
        variant="h3"
        gutterBottom={true}
        color="primary"
      >
        {t("onboarding.task2")}
      </Typography>
      <Box
        display="flex"
        justifyContent="center"
        marginTop={4}
        marginBottom={2}
        marginX={3}
      >
        <Typography align="center" variant="body1" gutterBottom={true}>
          {t("onboarding.task2Description")}
        </Typography>
      </Box>
    </Container>
  );
}

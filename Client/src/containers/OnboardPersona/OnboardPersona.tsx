import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Container, Typography, Box, Grid } from "@material-ui/core";
import { personas } from "../../data/Persona";
import PersonaCard from "../../components/PersonaCard/PersonaCard";
import { UserType } from "../../types/Auth";

interface Props {
  onChange(type: UserType): void;
}

export default function OnboardPersona({ onChange }: Props) {
  const { t } = useTranslation();

  const handleSelect = useCallback(
    (type: UserType) => {
      onChange(type);
    },
    [onChange]
  );

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
      <Box
        display="flex"
        justifyContent="center"
        marginTop={4}
        marginBottom={2}
        marginX={3}
      >
        <Typography align="center" variant="body1" gutterBottom={true}>
          {t("onboarding.task1Description")}
        </Typography>
      </Box>
      <Grid container={true} spacing={3} justify="center">
        {personas.map((persona, key) => (
          <Grid item={true} xs={12} sm={6} md={4} key={key}>
            <PersonaCard persona={persona} onSelect={handleSelect} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

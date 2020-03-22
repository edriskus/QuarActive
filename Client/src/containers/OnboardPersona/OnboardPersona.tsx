import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Container, Typography, Box, Grid, Button } from "@material-ui/core";
import { personas } from "../../data/Persona";
import { personalityTraits } from "../../data/PersonalityTrait";
import PersonaCard from "../../components/PersonaCard/PersonaCard";
import PersonalityTraitCard from "../../components/PersonalityTraitCard/PersonalityTraitCard";
import { UserType } from "../../types/Auth";
import { PersonalityTraitType } from "../../types/Persona";

interface Props {
  type?: UserType;
  traits?: PersonalityTraitType[];
  onNext(): void;
  onTypeChange(type: UserType): void;
  onTraitsChange(traits: PersonalityTraitType[]): void;
}

export default function OnboardPersona({
  type,
  traits,
  onNext,
  onTypeChange,
  onTraitsChange
}: Props) {
  const { t } = useTranslation();

  const handleTypeSelect = useCallback(
    (type: UserType) => {
      onTypeChange(type);
    },
    [onTypeChange]
  );

  const handleTraitSelect = useCallback(
    (trait: PersonalityTraitType) => {
      console.log(traits, [...(traits ?? []), trait]);

      onTraitsChange([...(traits ?? []), trait]);
    },
    [onTraitsChange, traits]
  );

  const handleTraitUnselect = useCallback(
    (trait: PersonalityTraitType) => {
      onTraitsChange((traits ?? []).filter(t => t !== trait));
    },
    [onTraitsChange, traits]
  );

  const handleTraitsSubmit = useCallback(() => {
    onNext();
  }, [onNext]);

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
          {!type
            ? t("onboarding.task1Description")
            : t("onboarding.task1TraitsDescription")}
        </Typography>
      </Box>
      {!type ? (
        <Grid container={true} spacing={3} justify="center">
          {personas.map((persona, key) => (
            <Grid item={true} xs={12} sm={6} md={4} key={key}>
              <PersonaCard persona={persona} onSelect={handleTypeSelect} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <>
          <Grid container={true} spacing={3} justify="center">
            {personalityTraits.map((trait, key) => (
              <Grid item={true} xs={12} sm={6} md={4} key={key}>
                <PersonalityTraitCard
                  trait={trait}
                  onSelect={handleTraitSelect}
                  onUnselect={handleTraitUnselect}
                  selected={!!(traits ?? []).find(t => t === trait.type)}
                />
              </Grid>
            ))}
          </Grid>
          <Box display="flex" width="100%" justifyContent="center" paddingY={3}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleTraitsSubmit}
            >
              {t("common.next")}
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
}

import React, { useCallback } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Box,
  Typography,
  Grid,
  Fab
} from "@material-ui/core";
import { PersonalityTrait, PersonalityTraitType } from "../../types/Persona";
import { Check, Add } from "@material-ui/icons";
import { useLocale, local } from "../../utils/Translation";

interface Props {
  trait: PersonalityTrait;
  selected: boolean;
  onSelect(trait: PersonalityTraitType): void;
  onUnselect(trait: PersonalityTraitType): void;
}

export default function PersonalityTraitCard({
  trait,
  onSelect,
  onUnselect,
  selected
}: Props) {
  const { title, type } = trait;
  const { locale } = useLocale();

  const handleSelect = useCallback(() => {
    onSelect(type);
  }, [onSelect, type]);

  const handleUnselect = useCallback(() => {
    onUnselect(type);
  }, [onUnselect, type]);

  return (
    <Card elevation={4}>
      <CardMedia>
        <Box
          height={100}
          display="flex"
          width="100%"
          justifyContent="center"
          padding={2}
          marginBottom={4}
        >
          <img
            src={trait.illustration}
            height={100}
            width="auto"
            alt={local(title, locale)}
          />
        </Box>
      </CardMedia>
      <CardContent>
        <Box marginBottom={3}>
          <Typography variant="h4" color="primary" align="center">
            {local(title, locale)}
          </Typography>
        </Box>
        <Box paddingX={2}>
          <Grid container={true} justify="center" wrap="nowrap" spacing={2}>
            <Grid item={true} xs="auto">
              <Box display="flex" height="100%" alignItems="center">
                <Fab
                  color={selected ? "primary" : "default"}
                  aria-label="next"
                  onClick={selected ? handleUnselect : handleSelect}
                >
                  {selected ? <Check /> : <Add />}
                </Fab>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}

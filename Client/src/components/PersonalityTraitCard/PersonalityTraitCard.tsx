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
  const { title, description, type } = trait;
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
        <Box height={200} display="flex" width="100%" justifyContent="center">
          <trait.illustration />
        </Box>
      </CardMedia>
      <CardContent>
        <Box marginBottom={3}>
          <Typography variant="h4" color="primary" align="center">
            {local(title, locale)}
          </Typography>
        </Box>
        <Box paddingX={2}>
          <Grid
            container={true}
            justify="space-between"
            wrap="nowrap"
            spacing={2}
          >
            <Grid item={true} xs="auto">
              <Typography variant="body1" align="left">
                {local(description, locale)}
              </Typography>
            </Grid>
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

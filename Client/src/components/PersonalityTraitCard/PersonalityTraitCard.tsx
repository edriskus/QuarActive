import React, { useCallback } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Box,
  Typography,
  CardActionArea
} from "@material-ui/core";
import { PersonalityTrait, PersonalityTraitType } from "../../types/Persona";
import { CheckCircle, CheckCircleOutline } from "@material-ui/icons";
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
    <Card elevation={selected ? 8 : 4}>
      <CardActionArea onClick={selected ? handleUnselect : handleSelect}>
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
          <Box position="absolute" top={16} right={16}>
            {selected ? (
              <CheckCircle color="primary" />
            ) : (
              <CheckCircleOutline color="disabled" />
            )}
          </Box>
        </CardMedia>
        <CardContent>
          <Box>
            <Typography variant="h4" color="primary" align="center">
              {local(title, locale)}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

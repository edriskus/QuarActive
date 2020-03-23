import React, { useCallback } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Box,
  Typography,
  Grid,
  Fab,
  CardActionArea
} from "@material-ui/core";
import { Persona } from "../../types/Persona";
import { UserType } from "../../types/Auth";
import { ArrowForward } from "@material-ui/icons";
import { useLocale, local } from "../../utils/Translation";

interface Props {
  persona: Persona;
  onSelect(type: UserType): void;
}

export default function PersonaCard({ persona, onSelect }: Props) {
  const { title, description, type } = persona;
  const { locale } = useLocale();

  const handleSelect = useCallback(() => {
    onSelect(type);
  }, [onSelect, type]);

  return (
    <Card elevation={4}>
      <CardActionArea onClick={handleSelect}>
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
              src={persona.illustration}
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
                  <Fab color="secondary" aria-label="next">
                    <ArrowForward />
                  </Fab>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

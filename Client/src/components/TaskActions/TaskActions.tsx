import React from "react";
import { Grid, IconButton, Box } from "@material-ui/core";
import { Close } from "@material-ui/icons";

interface Props {
  onClose: () => void;
}

export default function TaskActions({ onClose }: Props) {
  return (
    <Box marginLeft={-2}>
      <Grid container={true} justify="space-between">
        <Grid item={true} xs="auto">
          <IconButton onClick={onClose} color="inherit">
            <Close fontSize="large" />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
}

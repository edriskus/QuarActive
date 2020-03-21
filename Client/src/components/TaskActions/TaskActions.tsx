import React from "react";
import { Grid, IconButton } from "@material-ui/core";
import { Close, Share, FavoriteBorder } from "@material-ui/icons";

interface Props {
  onClose: () => void;
}

export default function TaskActions({ onClose }: Props) {
  return (
    <Grid container={true} justify="space-between">
      <Grid item={true} xs="auto">
        <IconButton onClick={onClose} color="inherit">
          <Close fontSize="default" />
        </IconButton>
      </Grid>
      <Grid item={true} xs="auto">
        <IconButton disabled={true} color="inherit">
          <Share fontSize="default" />
        </IconButton>
      </Grid>
      <Grid item={true} xs="auto">
        <IconButton disabled={true} color="inherit">
          <FavoriteBorder fontSize="default" />
        </IconButton>
      </Grid>
    </Grid>
  );
}

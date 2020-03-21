import React from "react";
import { Task } from "../../types/Task";
import { Box, Grid, Typography } from "@material-ui/core";
import Trait from "../Trait/Trait";
import { SignalCellularAlt } from "@material-ui/icons";

interface Props {
  titleVariant?: "h3" | "h4";
  task: Task;
}

export default function FlatInfo({ task, titleVariant = "h4" }: Props) {
  return (
    <Box>
      <Grid
        container={true}
        spacing={1}
        justify="space-between"
        alignItems="center"
      >
        <Grid item={true} xs="auto">
          <Typography variant={titleVariant}>{task.title}</Typography>
        </Grid>
      </Grid>
      <Grid container={true} spacing={1} justify="space-between">
        <Grid item={true} xs="auto">
          <Trait icon={SignalCellularAlt} title={task.difficulty} />
        </Grid>
      </Grid>
    </Box>
  );
}

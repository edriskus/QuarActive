import React, { useState, useCallback } from "react";
import { Task } from "../../types/Task";
import { Box, Typography, Grid } from "@material-ui/core";
import ImageCard from "../ImageCard/ImageCard";
import OverCard from "../OverCard/OverCard";
import StatusBlob from "../StatusBlob/StatusBlob";

interface Props {
  task: Task;
}

export default function TaskCard({ task }: Props) {
  const [overlaid, setOverlaid] = useState(false);
  const openOverlaid = useCallback(() => !overlaid && setOverlaid(true), [
    overlaid
  ]);
  const closeOverlaid = useCallback(() => overlaid && setOverlaid(false), [
    overlaid
  ]);
  return (
    <Box paddingBottom={4} onClick={openOverlaid}>
      <ImageCard src={task.cover} overlaid={overlaid}>
        <Grid
          container={true}
          spacing={1}
          justify="space-between"
          alignItems="center"
          wrap="nowrap"
        >
          <Grid item={true} xs="auto">
            <Box padding={2}>
              <Typography variant="h5" color="primary">
                {task.title}
              </Typography>
              <Typography variant="body1">{task.description}</Typography>
            </Box>
          </Grid>
          <Grid item={true} xs="auto">
            <StatusBlob size={"100px"} placementX="right" placementY="bottom">
              <Typography variant="button" color="inherit">
                {task.difficulty}
              </Typography>
            </StatusBlob>
          </Grid>
        </Grid>
      </ImageCard>
      <OverCard task={task} open={overlaid} onClose={closeOverlaid} />
    </Box>
  );
}

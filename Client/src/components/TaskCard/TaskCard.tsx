import React, { useState, useCallback } from "react";
import { Task } from "../../types/Task";
import { Box, Typography, Grid } from "@material-ui/core";
import ImageCard from "../ImageCard/ImageCard";
import OverCard from "../OverCard/OverCard";
import StatusBlob from "../StatusBlob/StatusBlob";

interface Props {
  task: Task;
  minimal?: boolean;
}

export default function TaskCard({ task, minimal }: Props) {
  const [overlaid, setOverlaid] = useState(false);
  const openOverlaid = useCallback(() => !overlaid && setOverlaid(true), [
    overlaid
  ]);
  const closeOverlaid = useCallback(() => overlaid && setOverlaid(false), [
    overlaid
  ]);
  return (
    <Box onClick={openOverlaid}>
      <ImageCard src={task.cover} overlaid={overlaid}>
        <Grid
          container={true}
          spacing={1}
          justify="space-between"
          alignItems="flex-end"
          wrap={"nowrap"}
        >
          <Grid item={true} xs="auto">
            <Box padding={2} width="100%" paddingTop={minimal ? 0 : 2}>
              <Typography
                variant={minimal ? "h6" : "h5"}
                color="primary"
                gutterBottom={true}
              >
                {task.title}
              </Typography>
              {!minimal && (
                <Typography variant="body2">{task.description}</Typography>
              )}
            </Box>
          </Grid>
          <Grid item={true} xs={minimal ? 12 : "auto"}>
            <Box display="flex" justifyContent="flex-end" width="100%">
              <StatusBlob
                size={minimal ? 50 : 100}
                placementX="right"
                placementY="bottom"
                margin={minimal ? -1 : -3}
                padding={minimal ? 0.5 : 2}
              >
                <Typography
                  variant={minimal ? "overline" : "button"}
                  color="inherit"
                >
                  {task.difficulty}
                </Typography>
              </StatusBlob>
            </Box>
          </Grid>
        </Grid>
      </ImageCard>
      <OverCard task={task} open={overlaid} onClose={closeOverlaid} />
    </Box>
  );
}

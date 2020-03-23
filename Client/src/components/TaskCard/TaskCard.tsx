import React, { useCallback } from "react";
import { Task } from "../../types/Task";
import {
  Box,
  Typography,
  Grid,
  useMediaQuery,
  useTheme
} from "@material-ui/core";
import ImageCard from "../ImageCard/ImageCard";
import OverCard from "../OverCard/OverCard";
import StatusBlob from "../StatusBlob/StatusBlob";
import OverDialog from "../OverDialog/OverDialog";
import { useLocale, local } from "../../utils/Translation";
import Difficulty from "../Difficulty/Difficulty";
import { resolveTaskImage } from "../../utils/Task";

interface Props {
  task: Task;
  minimal?: boolean;
  open?: boolean;
  onOpen(taskId: string): void;
  onClose(): void;
}

export default function TaskCard({
  task,
  minimal,
  onOpen,
  onClose,
  open
}: Props) {
  const overlaid = open;
  const setOverlaid = useCallback(
    (value?: boolean) => {
      if (value) {
        onOpen(task.id);
      } else {
        onClose();
      }
    },
    [onClose, onOpen, task.id]
  );
  const openOverlaid = useCallback(() => !overlaid && setOverlaid(true), [
    overlaid,
    setOverlaid
  ]);
  const closeOverlaid = useCallback(() => overlaid && setOverlaid(false), [
    overlaid,
    setOverlaid
  ]);

  const theme = useTheme();
  const { locale } = useLocale();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const imageHeight = minimal || isSmall ? 140 : 300;

  return (
    <Box onClick={openOverlaid}>
      <ImageCard
        src={resolveTaskImage(task)}
        key={"imageCard" + task.id}
        overlaid={overlaid && isSmall}
        height={imageHeight}
      >
        <Grid
          container={true}
          spacing={1}
          justify="space-between"
          alignItems="flex-end"
          wrap={"nowrap"}
        >
          <Grid item={true} style={{ flexGrow: 1 }}>
            <Box
              padding={2}
              width="100%"
              paddingY={minimal ? 0 : 2}
              minHeight={minimal ? 50 : undefined}
            >
              <Typography
                variant={minimal ? "h6" : "h5"}
                color="primary"
                gutterBottom={true}
              >
                {local(task.title, locale)}
              </Typography>
              {!minimal && (
                <Typography variant="body2">
                  {local(task.description, locale)}
                </Typography>
              )}
            </Box>
          </Grid>
          <Grid
            item={true}
            xs={minimal ? 12 : "auto"}
            style={{ maxWidth: minimal ? 50 : 100 }}
          >
            <Box display="flex" justifyContent="flex-end" width="100%">
              <StatusBlob
                size={minimal ? 50 : 100}
                placementX="right"
                placementY="bottom"
                margin={minimal ? -1 : -3}
                padding={minimal ? 0.5 : 2}
              >
                <Difficulty difficulty={task.difficulty} status={task.status} />
              </StatusBlob>
            </Box>
          </Grid>
        </Grid>
      </ImageCard>
      {isSmall && (
        <OverCard
          key={"overCard" + task.id}
          task={task}
          open={!!overlaid}
          onClose={closeOverlaid}
        />
      )}
      {!isSmall && (
        <OverDialog
          key={"overDialog" + task.id}
          task={task}
          open={!!overlaid}
          onClose={closeOverlaid}
        />
      )}
    </Box>
  );
}

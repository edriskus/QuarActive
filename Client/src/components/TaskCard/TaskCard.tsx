import React, { useState, useCallback } from "react";
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
import { useTranslation } from "react-i18next";

interface Props {
  task: Task;
  minimal?: boolean;
}

export default function TaskCard({ task, minimal }: Props) {
  const { t } = useTranslation();
  const [overlaid, setOverlaid] = useState(false);
  const openOverlaid = useCallback(() => !overlaid && setOverlaid(true), [
    overlaid
  ]);
  const closeOverlaid = useCallback(() => overlaid && setOverlaid(false), [
    overlaid
  ]);

  const theme = useTheme();
  const { locale } = useLocale();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const imageHeight = minimal || isSmall ? 140 : 300;

  return (
    <Box onClick={openOverlaid}>
      <ImageCard
        src={task.cover}
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
          <Grid item={true} xs="auto">
            <Box padding={2} width="100%" paddingTop={minimal ? 0 : 2}>
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
                  {t(`difficulty.${task.difficulty}`)}
                </Typography>
              </StatusBlob>
            </Box>
          </Grid>
        </Grid>
      </ImageCard>
      {isSmall && (
        <OverCard task={task} open={overlaid} onClose={closeOverlaid} />
      )}
      {!isSmall && (
        <OverDialog task={task} open={overlaid} onClose={closeOverlaid} />
      )}
    </Box>
  );
}

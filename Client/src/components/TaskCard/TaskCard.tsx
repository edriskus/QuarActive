import React, { useState, useCallback } from "react";
import { Task } from "../../types/Task";
import { Box } from "@material-ui/core";
import ImageCard from "../ImageCard/ImageCard";
import FlatInfo from "../FlatInfo/FlatInfo";
import OverCard from "../OverCard/OverCard";

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
        <Box marginTop={2}>
          <FlatInfo task={task} />
        </Box>
      </ImageCard>
      <OverCard task={task} open={overlaid} onClose={closeOverlaid} />
    </Box>
  );
}

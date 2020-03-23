import React from "react";
import { useStyles } from "./CardSkeleton.styles";
import Skeleton from "@material-ui/lab/Skeleton";

export default function CardSkeleton() {
  const classes = useStyles();
  return (
    <Skeleton
      variant="rect"
      width="100%"
      height={200}
      className={classes.skeleton}
    />
  );
}

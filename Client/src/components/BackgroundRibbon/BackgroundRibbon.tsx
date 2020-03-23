import React from "react";
import { Box, Hidden } from "@material-ui/core";
import { useStyles } from "./BackgroundRibbon.styles";

export default function BackgroundRibbon() {
  const classes = useStyles();
  return (
    <Hidden smDown={true}>
      <Box className={classes.ribbon} />
    </Hidden>
  );
}

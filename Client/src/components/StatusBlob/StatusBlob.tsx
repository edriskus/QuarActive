import React, { PropsWithChildren } from "react";
import { Box } from "@material-ui/core";
import { useStyles } from "./StatusBlob.styles";

interface Props {
  size: any;
  placementY: "top" | "bottom";
  placementX: "left" | "right";
  margin?: any;
  padding?: any;
}

export default function StatusBlob({
  children,
  size,
  placementX,
  placementY,
  margin = -3,
  padding = 2
}: PropsWithChildren<Props>) {
  const classes = useStyles();
  const marginLeft = placementX === "left" ? margin : undefined;
  const marginRight = placementX === "right" ? margin : undefined;
  const marginTop = placementY === "top" ? margin : undefined;
  const marginBottom = placementY === "bottom" ? margin : undefined;
  const paddingLeft = placementX === "left" ? padding : undefined;
  const paddingRight = placementX === "right" ? padding : undefined;
  const paddingTop = placementY === "top" ? padding : undefined;
  const paddingBottom = placementY === "bottom" ? padding : undefined;
  return (
    <Box
      className={classes.blob}
      width={size}
      height={size}
      marginLeft={marginLeft}
      marginRight={marginRight}
      marginTop={marginTop}
      marginBottom={marginBottom}
      paddingLeft={paddingLeft}
      paddingRight={paddingRight}
      paddingTop={paddingTop}
      paddingBottom={paddingBottom}
    >
      {children}
    </Box>
  );
}

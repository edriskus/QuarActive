import React from "react";
import { Box, Typography, SvgIconProps } from "@material-ui/core";
import { useStyles } from "./Trait.styles";

interface Props {
  title: string;
  icon: React.ComponentType<SvgIconProps>;
}

export default function Trait({ title, icon }: Props) {
  const Icon = icon;
  const { wrapper, traitIcon, traitTitle } = useStyles();
  return (
    <Box color="primary" className={wrapper}>
      <Icon color="primary" className={traitIcon} />
      <Typography variant="body2" color="textPrimary" className={traitTitle}>
        {title}
      </Typography>
    </Box>
  );
}

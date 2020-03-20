import React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton
} from "@material-ui/core";
import { useStyles } from "./Header.styles";
import { AccountCircle } from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Header() {
  const classes = useStyles();
  return (
    <>
      <AppBar position="fixed" color="transparent">
        <Toolbar>
          <Box className={classes.wrapper}>
            <Typography variant="h6" component={Link} to="/">
              LOGO
            </Typography>
            <Box>
              <IconButton>
                <AccountCircle />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
}

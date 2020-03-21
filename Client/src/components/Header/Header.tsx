import React, { useState, useCallback, MouseEvent } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem
} from "@material-ui/core";
import { useStyles } from "./Header.styles";
import { AccountCircle, VpnKeyOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useToken, useAuth, useBalance } from "../../utils/Auth";

export default function Header() {
  const classes = useStyles();
  const { clearAuth } = useAuth();
  const token = useToken();
  const balance = useBalance();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => setAnchorEl(null), []);

  const handleLogout = useCallback(() => {
    clearAuth();
    handleClose();
  }, [clearAuth, handleClose]);

  return (
    <>
      <AppBar position="fixed" color="transparent" elevation={0}>
        <Toolbar>
          <Box className={classes.wrapper}>
            <Typography variant="h6" component={Link} to="/">
              LOGO
            </Typography>
            <Box className={classes.centered}>
              {!!token && (
                <>
                  {balance != null && (
                    <Typography variant="button">{balance}</Typography>
                  )}
                  <IconButton
                    color="secondary"
                    onClick={handleClick}
                    aria-controls="profile-menu"
                    aria-haspopup="true"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="profile-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </>
              )}
              {!token && (
                <>
                  <IconButton color="primary" component={Link} to="/login">
                    <VpnKeyOutlined />
                  </IconButton>
                </>
              )}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
}

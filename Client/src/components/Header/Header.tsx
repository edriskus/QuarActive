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
import {
  VpnKeyOutlined,
  AccountCircleOutlined,
  NotificationsNoneOutlined
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useToken, useAuth, useBalance } from "../../utils/Auth";
import { ReactComponent as ToiletPaper } from "../../illustrations/ToiletPaper.svg";
import { useLocale } from "../../utils/Translation";

export default function Header() {
  const classes = useStyles();
  const { clearAuth, auth } = useAuth();
  const token = useToken();
  const emulated = auth?.emulated;
  const balance = useBalance();

  const { locale, setLocale } = useLocale();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [localeAnchor, setLocaleAnchor] = useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleLocale = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    setLocaleAnchor(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => setAnchorEl(null), []);

  const handleLocaleClose = useCallback(() => setLocaleAnchor(null), []);

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
              <IconButton
                color="primary"
                onClick={handleLocale}
                aria-controls="profile-menu"
                aria-haspopup="true"
                className={classes.customButton}
              >
                <Typography variant="button">{locale}</Typography>
              </IconButton>
              <Menu
                id="profile-menu"
                anchorEl={localeAnchor}
                keepMounted
                open={Boolean(localeAnchor)}
                onClose={handleLocaleClose}
              >
                <MenuItem onClick={() => setLocale("lt")}>LT</MenuItem>
                <MenuItem onClick={() => setLocale("en")}>EN</MenuItem>
              </Menu>
              {!!token && !emulated && (
                <>
                  {balance != null && (
                    <>
                      <Box>
                        <Typography variant="caption" color="primary">
                          {balance}
                        </Typography>
                      </Box>
                      <Box padding={0.5} paddingBottom={0}>
                        <ToiletPaper />
                      </Box>
                    </>
                  )}
                  <IconButton color="primary" className={classes.customButton}>
                    <NotificationsNoneOutlined />
                  </IconButton>
                  <IconButton
                    color="primary"
                    onClick={handleClick}
                    aria-controls="profile-menu"
                    aria-haspopup="true"
                    className={classes.customButton}
                  >
                    <AccountCircleOutlined />
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
              {(!token || emulated) && (
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

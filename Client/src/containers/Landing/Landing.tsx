import React from "react";
import { useTranslation } from "react-i18next";
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  useTheme,
  useMediaQuery
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { ReactComponent as LandingIllustration } from "../../illustrations/Landing.svg";

export default function Landing() {
  const { t } = useTranslation();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container maxWidth="lg">
      <Box
        display="flex"
        width="100%"
        alignItems="center"
        height={isMd ? "auto" : "calc(100vh - 128px)"}
      >
        <Grid container={true}>
          <Grid item={true} xs={12} md={7}>
            <Box
              display="flex"
              justifyContent="center"
              width="100%"
              height={isMd ? 165 : 460}
              paddingY={4}
              marginTop={2}
              paddingX={4}
            >
              <LandingIllustration height="100%" width="100%" />
            </Box>
          </Grid>
          <Grid item={true} xs={12} md={5}>
            <Typography
              align={isMd ? "center" : "right"}
              variant={isMd ? "h3" : "h2"}
              gutterBottom={true}
              color="primary"
            >
              {t("landing.stuckInQuarantine")}
            </Typography>
            <Box
              display="flex"
              justifyContent={isMd ? "center" : "flex-end"}
              marginTop={4}
              marginX={isMd ? 3 : 0}
            >
              <Typography
                align={isMd ? "center" : "right"}
                variant="body1"
                gutterBottom={true}
              >
                {t("landing.storyDescription")}
              </Typography>
            </Box>
            <Box
              display="flex"
              justifyContent={isMd ? "center" : "flex-end"}
              width="100%"
              marginTop={6}
            >
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/onboarding"
              >
                {t("landing.challengeAccepted")}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

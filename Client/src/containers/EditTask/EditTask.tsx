import React from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box
} from "@material-ui/core";
import ScrollTop from "../../components/ScrollTop/ScrollTop";
import { useLocale, local } from "../../utils/Translation";
import BackgroundRibbon from "../../components/BackgroundRibbon/BackgroundRibbon";

export default function EditTask() {
  const task = {
    title: "Abc",
    description: {
      en: "ASDFASD",
      lt: "ASFASDF"
    }
  };
  const { locale } = useLocale();
  return (
    <Container maxWidth="lg">
      <ScrollTop />
      <Box paddingY={3}>
        <Typography align="center" variant="h3" color="primary">
          {task.title}
        </Typography>
      </Box>
      <Card>
        <CardContent>
          <Typography variant="body1">
            {local(task.description, locale)}
          </Typography>
        </CardContent>
      </Card>
      <BackgroundRibbon />
    </Container>
  );
}

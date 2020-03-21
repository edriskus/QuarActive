import React from "react";
import { Task } from "../../types/Task";
import { useTranslation } from "react-i18next";
import { Container, Typography, Box, Grid } from "@material-ui/core";
import TaskCard from "../../components/TaskCard/TaskCard";
import { useQuery } from "@apollo/react-hooks";
import { getTasks } from "../../graphql/Task";

export default function Home() {
  const { data } = useQuery<{ tasks: Task[] }>(getTasks);
  const featuredTask = data?.tasks?.[0];
  const moreTasks = data?.tasks?.slice(1) ?? [];

  const { t } = useTranslation();
  return (
    <Container maxWidth="md">
      <Box paddingY={3}>
        <Typography align="center" variant="h3" color="primary">
          {t("home.dailyChallenge")}
        </Typography>
      </Box>
      {!!featuredTask && <TaskCard task={featuredTask} />}
      <Box paddingY={3} paddingTop={4}>
        <Typography align="center" variant="h3" color="primary">
          {t("home.moreChallenges")}
        </Typography>
      </Box>
      <Grid container={true} spacing={2}>
        {moreTasks.map((item, key) => (
          <Grid item={true} xs={6} sm={4} md={3} key={key}>
            <TaskCard task={item} minimal={true} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

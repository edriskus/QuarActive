import React, { useState, useCallback, useEffect } from "react";
import { Task } from "../../types/Task";
import { useTranslation } from "react-i18next";
import { Container, Typography, Box, Grid } from "@material-ui/core";
import TaskCard from "../../components/TaskCard/TaskCard";
import { useQuery } from "@apollo/react-hooks";
import { getTasks } from "../../graphql/Task";
import { useParams, useHistory } from "react-router-dom";
import { sortByStatus } from "../../utils/Task";
import { useAuth } from "../../utils/Auth";
import BackgroundRibbon from "../../components/BackgroundRibbon/BackgroundRibbon";
import CardSkeleton from "../../components/CardSkeleton/CardSkeleton";
import Quiz from "../Quiz/Quiz";
import {
  HowAreYou,
  HealthCheckQuestions,
  HealthCheckTask
} from "../../data/HealthCheck";
import { useDailyHealth } from "../../utils/DailyHealth";
import ScrollTop from "../../components/ScrollTop/ScrollTop";

export default function Home() {
  const params = useParams<{ taskId?: string }>();
  const { replace } = useHistory();
  const { auth } = useAuth();
  const [staticTasks, setStaticTasks] = useState<Task[]>([]);
  const [selectedId, setSelectedId] = useState(params?.taskId);
  const { data } = useQuery<{ tasks: Task[] }>(getTasks, {
    variables: {
      traits: auth?.user?.personalityTraits ?? [],
      types: [auth?.user?.type]
    }
  });

  const sortedData = sortByStatus(staticTasks.concat(data?.tasks ?? []));
  const featuredTask = sortedData?.[0];
  const moreTasks = sortedData?.slice(1) ?? [];

  useEffect(() => {
    replace("/");
    if (!!params?.taskId) {
      setSelectedId(params?.taskId);
    }
    if (params?.taskId === "checkHealth") {
      setStaticTasks([HealthCheckTask]);
    }
    // eslint-disable-next-line
  }, [params?.taskId])

  const handleOpen = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedId(undefined);
  }, []);

  const { t } = useTranslation();
  const { show, complete } = useDailyHealth();

  if (show) {
    return (
      <Quiz
        initialQuestion={HowAreYou}
        complete={complete}
        questionMap={HealthCheckQuestions}
      />
    );
  }

  return (
    <Container maxWidth="md">
      <ScrollTop />
      <Box paddingY={3}>
        <Typography align="center" variant="h3" color="primary">
          {t("home.dailyChallenge")}
        </Typography>
      </Box>
      {!!featuredTask ? (
        <TaskCard
          task={featuredTask}
          key={featuredTask.id}
          onOpen={handleOpen}
          onClose={handleClose}
          open={featuredTask.id === selectedId}
        />
      ) : (
        <CardSkeleton />
      )}
      <Box paddingY={3} paddingTop={4}>
        <Typography align="center" variant="h3" color="primary">
          {t("home.moreChallenges")}
        </Typography>
      </Box>
      <Grid container={true} spacing={2}>
        {!data
          ? [true, true, true, true].map((item, key) => (
              <Grid item={true} xs={6} sm={4} md={3} key={key}>
                <CardSkeleton />
              </Grid>
            ))
          : moreTasks.map((item, key) => (
              <Grid item={true} xs={6} sm={4} md={3} key={item.id}>
                <TaskCard
                  task={item}
                  minimal={true}
                  onOpen={handleOpen}
                  onClose={handleClose}
                  open={item.id === selectedId}
                />
              </Grid>
            ))}
      </Grid>
      <BackgroundRibbon />
    </Container>
  );
}

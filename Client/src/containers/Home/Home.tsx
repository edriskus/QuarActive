import React, { useState, useCallback, useEffect } from "react";
import { Task } from "../../types/Task";
import { useTranslation } from "react-i18next";
import { Container, Typography, Box, Grid } from "@material-ui/core";
import TaskCard from "../../components/TaskCard/TaskCard";
import { useQuery } from "@apollo/react-hooks";
import { getTasks } from "../../graphql/Task";
import { useParams, useHistory } from "react-router-dom";
import { sortByStatus } from "../../utils/Task";
import Skeleton from "@material-ui/lab/Skeleton";

export default function Home() {
  const params = useParams<{ taskId?: string }>();
  const { replace } = useHistory();
  const [selectedId, setSelectedId] = useState(params?.taskId);
  const { data, loading } = useQuery<{ tasks: Task[] }>(getTasks);
  const sortedData = sortByStatus(data?.tasks ?? []);
  const featuredTask = sortedData?.[0];
  const moreTasks = sortedData?.slice(1) ?? [];

  useEffect(() => {
    replace("/");
    // eslint-disable-next-line
  }, [])

  const handleOpen = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedId(undefined);
  }, []);

  const { t } = useTranslation();
  return (
    <Container maxWidth="md">
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
        <Skeleton variant="rect" width="100%" height={200} />
      )}
      <Box paddingY={3} paddingTop={4}>
        <Typography align="center" variant="h3" color="primary">
          {t("home.moreChallenges")}
        </Typography>
      </Box>
      <Grid container={true} spacing={2}>
        {loading ? (
          <Grid item={true} xs={6} sm={4} md={3}>
            <Skeleton variant="rect" width="100%" height={200} />
          </Grid>
        ) : (
          moreTasks.map((item, key) => (
            <Grid item={true} xs={6} sm={4} md={3} key={item.id}>
              <TaskCard
                task={item}
                minimal={true}
                onOpen={handleOpen}
                onClose={handleClose}
                open={item.id === selectedId}
              />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
}

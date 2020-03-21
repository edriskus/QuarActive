import React from "react";
import { TaskStatus, Task, Difficulty } from "../../types/Task";
import { useTranslation } from "react-i18next";
import { Container, Typography, Box, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import TaskCard from "../../components/TaskCard/TaskCard";

export default function Landing() {
  const task: Task = {
    id: "1",
    title: "Visit a virtual museum",
    description: "Lipsum",
    difficulty: Difficulty.easy,
    checkpoints: [],
    cover: "/assets/Museum.svg",
    status: TaskStatus.inProgress
  };
  const { t } = useTranslation();
  return (
    <Container maxWidth="sm">
      <Box paddingY={3}>
        <Typography align="center" variant="h3" color="primary">
          {t("home.dailyChallenge")}
        </Typography>
      </Box>
      <TaskCard task={task} />
    </Container>
  );
}

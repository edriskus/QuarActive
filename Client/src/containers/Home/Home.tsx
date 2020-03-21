import React from "react";
import {
  TaskStatus,
  Task,
  Difficulty,
  CheckpointStatus
} from "../../types/Task";
import { useTranslation } from "react-i18next";
import { Container, Typography, Box, Grid } from "@material-ui/core";
import TaskCard from "../../components/TaskCard/TaskCard";

const task: Task = {
  id: "1",
  title: {
    en: "Visit a virtual museum",
    lt: "Aplankyk virtualų muziejų"
  },
  description: {
    en:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.",
    lt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do."
  },
  difficulty: Difficulty.easy,
  checkpoints: [
    {
      id: "1",
      title: {
        en: "1st step",
        lt: "1 žingsnis"
      },
      description: {
        en:
          "Guernica is a large 1937 oil painting on canvas by Spanish artist Pablo Picasso. One of Picasso's best known works, Guernica is regarded by many art critics as one of the most moving and powerful anti-war paintings in history. It is exhibited in the Museo Reina Sofía in Madrid.",
        lt:
          "„Guernica“ yra didelis 1937 m. Aliejinis paveikslas, ant drobės pagamintas ispanų dailininko Pablo Picasso. Vienas geriausiai žinomų Pikaso darbų, „Guernica“ daugelio meno kritikų vertinamas kaip vienas judančių ir galingiausių prieškario paveikslų istorijoje. Jis eksponuojamas muziejuje „Reina Sofía“ Madride."
      },
      status: CheckpointStatus.toDo
    },
    {
      id: "2",
      title: {
        en: "2nd step",
        lt: "2 žingsnis"
      },
      description: {
        en:
          "Guernica is a large 1937 oil painting on canvas by Spanish artist Pablo Picasso. One of Picasso's best known works, Guernica is regarded by many art critics as one of the most moving and powerful anti-war paintings in history. It is exhibited in the Museo Reina Sofía in Madrid.",
        lt:
          "„Guernica“ yra didelis 1937 m. Aliejinis paveikslas, ant drobės pagamintas ispanų dailininko Pablo Picasso. Vienas geriausiai žinomų Pikaso darbų, „Guernica“ daugelio meno kritikų vertinamas kaip vienas judančių ir galingiausių prieškario paveikslų istorijoje. Jis eksponuojamas muziejuje „Reina Sofía“ Madride."
      },
      status: CheckpointStatus.toDo
    }
  ],
  cover: "/assets/Museum.svg",
  status: TaskStatus.inProgress
};

export default function Home() {
  const { t } = useTranslation();
  return (
    <Container maxWidth="md">
      <Box paddingY={3}>
        <Typography align="center" variant="h3" color="primary">
          {t("home.dailyChallenge")}
        </Typography>
      </Box>
      <TaskCard task={task} />
      <Box paddingY={3} paddingTop={4}>
        <Typography align="center" variant="h3" color="primary">
          {t("home.moreChallenges")}
        </Typography>
      </Box>
      <Grid container={true} spacing={2}>
        {[task, task, task, task].map((item, key) => (
          <Grid item={true} xs={6} sm={4} md={3} key={key}>
            <TaskCard task={item} minimal={true} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

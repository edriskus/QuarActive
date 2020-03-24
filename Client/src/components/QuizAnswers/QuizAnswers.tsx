import React, { useCallback, useState, useEffect } from "react";
import { Grid, Box, Typography, IconButton } from "@material-ui/core";
import { Answer } from "../../types/Question";
import AnswerCard from "../AnswerCard/AnswerCard";
import { local, useLocale } from "../../utils/Translation";
import { ArrowForward } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

interface Props {
  answers: Answer[];
  complete(answer: Answer): void;
  onChained(chainId?: string): void;
}

export default function QuizAnswers({ answers, complete, onChained }: Props) {
  const [halt, setHalt] = useState<Answer | undefined>();
  const { push } = useHistory();

  const handleAnswer = useCallback(
    (answer: Answer) => () => {
      if (answer.halt) {
        setHalt(answer);
        onChained(undefined);
      } else if (answer.chainId) {
        setHalt(undefined);
        onChained(answer.chainId);
      }
    },
    [onChained]
  );

  const handleFinish = useCallback(() => {
    if (halt?.taskId) {
      push(`/${halt?.taskId}`);
      complete(halt);
    } else if (halt) {
      complete(halt);
    }
  }, [complete, halt, push]);

  const { locale } = useLocale();

  useEffect(() => {
    setHalt(undefined);
  }, [answers]);

  return (
    <>
      <Grid container={true} spacing={3} justify="center">
        {answers.map((answer, key) => (
          <Grid item={true} xs={6} sm={6} key={key}>
            <AnswerCard answer={answer} onClick={handleAnswer(answer)} />
          </Grid>
        ))}
      </Grid>
      {!!halt && (
        <Box
          paddingTop={3}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          {!!halt.halt && (
            <Typography
              align="center"
              variant="h4"
              gutterBottom={true}
              color="primary"
            >
              {local(halt.halt, locale)}
            </Typography>
          )}
          <IconButton color="primary" onClick={handleFinish}>
            <ArrowForward fontSize="large" />
          </IconButton>
        </Box>
      )}
    </>
  );
}

import React, { useState, useCallback } from "react";
import { Question, Answer } from "../../types/Question";
import { Container, Box, Typography } from "@material-ui/core";
import { useLocale, local } from "../../utils/Translation";
import QuizAnswers from "../../components/QuizAnswers/QuizAnswers";

interface Props {
  initialQuestion: Question;
  complete(answer: Answer): void;
  questionMap: Record<string, Question>;
}

export default function Quiz({
  initialQuestion,
  complete,
  questionMap
}: Props) {
  const [question, setQuestion] = useState<Question | undefined>();
  const handleChained = useCallback(
    (chainId?: string) => {
      if (chainId && questionMap[chainId]) {
        setQuestion(questionMap[chainId]);
      } else {
        setQuestion(undefined);
      }
    },
    [questionMap]
  );
  const { locale } = useLocale();
  return (
    <>
      <Container maxWidth="sm">
        <Box paddingTop={7}>
          <Typography
            align="center"
            variant="h3"
            gutterBottom={true}
            color="primary"
          >
            {local(initialQuestion.title, locale)}
          </Typography>
          <Box
            display="flex"
            justifyContent="center"
            marginTop={3}
            marginBottom={2}
            marginX={3}
          >
            {!!initialQuestion.description && (
              <Typography align="center" variant="body1" gutterBottom={true}>
                {local(initialQuestion.description, locale)}
              </Typography>
            )}
          </Box>
          <QuizAnswers
            answers={initialQuestion.answers}
            complete={complete}
            onChained={handleChained}
          />
        </Box>
      </Container>
      {question && (
        <Quiz
          initialQuestion={question}
          complete={complete}
          questionMap={questionMap}
        />
      )}
    </>
  );
}

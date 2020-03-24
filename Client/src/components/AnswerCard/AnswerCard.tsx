import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Box,
  Typography,
  CardActionArea
} from "@material-ui/core";
import { useLocale, local } from "../../utils/Translation";
import { Answer } from "../../types/Question";

interface Props {
  answer: Answer;
  disabled?: boolean;
  onClick(): void;
}

export default function AnswerCard({ answer, disabled, onClick }: Props) {
  const { locale } = useLocale();
  return (
    <Card elevation={4}>
      <CardActionArea onClick={onClick} disabled={disabled}>
        <CardMedia>
          <Box
            height={100}
            display="flex"
            width="100%"
            justifyContent="center"
            padding={2}
            marginBottom={4}
          >
            <img
              src={answer.illustration}
              height={100}
              width="auto"
              alt={local(answer.title, locale)}
            />
          </Box>
        </CardMedia>
        <CardContent>
          <Box>
            <Typography variant="h4" color="primary" align="center">
              {local(answer.title, locale)}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

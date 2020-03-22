import React from "react";
import { ApolloError } from "apollo-boost";
import { Typography, Box } from "@material-ui/core";
import { ErrorOutline } from "@material-ui/icons";

interface Props {
  error?: ApolloError;
}

export default function GraphErrors({ error }: Props) {
  return (
    <>
      {(error?.graphQLErrors ?? []).map((error, key) => (
        <Box display="flex" flexDirection="row" alignItems="center" marginY={1}>
          <Box marginRight={0.5}>
            <ErrorOutline color="error" />
          </Box>
          <Typography color="error" key={key}>
            {error?.message}
          </Typography>
        </Box>
      ))}
    </>
  );
}

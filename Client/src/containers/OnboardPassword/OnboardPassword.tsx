import React, { useState, FormEvent, useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  Container,
  Typography,
  Box,
  TextField,
  InputAdornment,
  Button,
  Grid,
  CircularProgress
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import { handleChange, findError } from "../../utils/Form";
import GraphErrors from "../../components/GraphErrors/GraphErrors";
import { ApolloError } from "apollo-boost";
import * as yup from "yup";

interface Props {
  initialValue?: string;
  loading?: boolean;
  error?: ApolloError;
  onChange(password: string): void;
}

const schema = yup.object().shape({
  password: yup.string().required()
});

export default function OnboardPassword({
  initialValue,
  onChange,
  loading,
  error
}: Props) {
  const { t } = useTranslation();

  const [password, setPassword] = useState(initialValue ?? "");
  const [errors, setErrors] = useState<yup.ValidationError[]>([]);

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      schema
        .validate({ password }, { abortEarly: false })
        .then(() => {
          onChange(password);
        })
        .catch(function(err) {
          setErrors(err.inner);
        });
    },
    [onChange, password]
  );

  const passwordError = findError(errors, "password")?.message;

  return (
    <Container maxWidth="sm">
      <Box paddingX={3} paddingTop={7}>
        <Typography
          align="center"
          variant="h3"
          gutterBottom={true}
          color="primary"
        >
          {t("onboarding.task3")}
        </Typography>
        <Box
          display="flex"
          justifyContent="center"
          marginTop={3}
          marginBottom={2}
          marginX={3}
        >
          <Typography align="center" variant="body1" gutterBottom={true}>
            {t("onboarding.task3Description")}
          </Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <TextField
            value={password}
            margin="normal"
            error={!!passwordError}
            helperText={passwordError}
            type="password"
            placeholder={t("login.password")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" color="textSecondary">
                  <LockOutlined />
                </InputAdornment>
              )
            }}
            fullWidth={true}
            variant="outlined"
            onChange={handleChange(setPassword)}
          />
          <Box
            display="flex"
            justifyContent="center"
            width="100%"
            marginTop={3}
          >
            <Grid container={true} spacing={3}>
              <Grid item={true} xs={12}>
                <GraphErrors error={error} />
                <Box display="flex" justifyContent="center" width="100%">
                  {loading ? (
                    <CircularProgress />
                  ) : (
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth={true}
                    >
                      {t("common.finish")}
                    </Button>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Box>
    </Container>
  );
}

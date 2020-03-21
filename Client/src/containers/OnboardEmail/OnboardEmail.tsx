import React, { useState, FormEvent, useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  Container,
  Typography,
  Box,
  TextField,
  InputAdornment,
  Button,
  Grid
} from "@material-ui/core";
import { AlternateEmail } from "@material-ui/icons";
import { handleChange, findError } from "../../utils/Form";
import * as yup from "yup";
import { useAuth, emulateAuth } from "../../utils/Auth";
import { UserType } from "../../types/Auth";

interface Props {
  initialValue?: string;
  type?: UserType;
  onChange(email: string): void;
}

const schema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required()
});

export default function OnboardEmail({ type, initialValue, onChange }: Props) {
  const { t } = useTranslation();

  const { setAuth } = useAuth();
  const [email, setEmail] = useState(initialValue ?? "");
  const [errors, setErrors] = useState<yup.ValidationError[]>([]);

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      schema
        .validate({ email }, { abortEarly: false })
        .then(() => {
          onChange(email);
        })
        .catch(function(err) {
          setErrors(err.inner);
        });
    },
    [email, onChange]
  );

  const handleSkip = useCallback(() => {
    console.log(type);

    if (type) {
      console.log(type, emulateAuth(type));
      setAuth(emulateAuth(type));
    }
  }, [setAuth, type]);

  const emailError = findError(errors, "email")?.message;

  return (
    <Container maxWidth="sm">
      <Typography
        align="center"
        variant="h3"
        gutterBottom={true}
        color="primary"
      >
        {t("onboarding.task2")}
      </Typography>
      <Box
        display="flex"
        justifyContent="center"
        marginTop={4}
        marginBottom={2}
        marginX={3}
      >
        <Typography align="center" variant="body1" gutterBottom={true}>
          {t("onboarding.task2Description")}
        </Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <TextField
          value={email}
          margin="normal"
          error={!!emailError}
          helperText={emailError}
          placeholder={t("login.email")}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" color="textSecondary">
                <AlternateEmail />
              </InputAdornment>
            )
          }}
          fullWidth={true}
          variant="outlined"
          onChange={handleChange(setEmail)}
        />
        <Box display="flex" justifyContent="center" width="100%" marginTop={4}>
          <Grid container={true} spacing={3}>
            <Grid item={true} xs={6}>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                fullWidth={true}
              >
                {t("common.next")}
              </Button>
            </Grid>
            <Grid item={true} xs={6}>
              <Button
                type="button"
                variant="outlined"
                color="primary"
                fullWidth={true}
                onClick={handleSkip}
              >
                {t("common.skip")}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </Container>
  );
}

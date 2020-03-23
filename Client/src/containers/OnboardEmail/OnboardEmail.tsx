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
import { useHistory } from "react-router-dom";
import { PersonalityTraitType } from "../../types/Persona";

interface Props {
  initialValue?: string;
  type?: UserType;
  traits?: PersonalityTraitType[];
  onChange(email: string): void;
}

const schema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required()
});

export default function OnboardEmail({
  type,
  traits,
  initialValue,
  onChange
}: Props) {
  const { t } = useTranslation();
  const { push } = useHistory();
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
    if (type && (traits?.length ?? 0) > 0) {
      setAuth(emulateAuth(type, traits ?? []));
      push("/");
    }
  }, [push, setAuth, traits, type]);

  const emailError = findError(errors, "email")?.message;

  return (
    <Container maxWidth="sm">
      <Box paddingX={3} paddingTop={7}>
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
          marginTop={3}
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
          <Box
            display="flex"
            justifyContent="center"
            width="100%"
            marginTop={3}
          >
            <Grid container={true} spacing={3}>
              <Grid item={true} xs={6}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
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
      </Box>
    </Container>
  );
}

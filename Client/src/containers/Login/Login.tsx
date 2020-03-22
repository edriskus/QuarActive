import React, { useCallback, FormEvent, useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  TextField,
  CircularProgress,
  InputAdornment
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { useMutation } from "@apollo/react-hooks";
import { login } from "../../graphql/Auth";
import { useAuth } from "../../utils/Auth";
import { Auth } from "../../types/Auth";
import { handleChange, findError } from "../../utils/Form";
import { ReactComponent as LandingIllustration } from "../../illustrations/Landing.svg";
import { AlternateEmail, LockOutlined } from "@material-ui/icons";
import * as yup from "yup";
import GraphErrors from "../../components/GraphErrors/GraphErrors";
import { Link } from "react-router-dom";

const schema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),
  password: yup.string().required()
});

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<yup.ValidationError[]>([]);

  const { auth, setAuth } = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    setErrors([]);
  }, [email, password]);

  const [doLogin, { loading, error }] = useMutation(login, {
    onCompleted: ({ login }: { login: Auth }) => {
      setAuth(login);
    }
  });

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      const variables = { email, password };
      schema
        .validate(variables, { abortEarly: false })
        .then(() => {
          doLogin({
            variables
          });
        })
        .catch(function(err) {
          setErrors(err.inner);
        });
    },
    [doLogin, email, password]
  );

  const emailError = findError(errors, "email")?.message;
  const passwordError = findError(errors, "password")?.message;

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        justifyContent="center"
        width="100%"
        paddingY={4}
        marginTop={2}
        paddingX={4}
      >
        <LandingIllustration />
      </Box>
      <Typography
        align="center"
        variant="h3"
        gutterBottom={true}
        color="primary"
      >
        {t("login.title")}
      </Typography>
      <Box display="flex" justifyContent="center" marginTop={4} marginX={3}>
        <Typography align="center" variant="body1" gutterBottom={true}>
          {t("login.description")}
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
        <TextField
          value={password}
          margin="normal"
          error={!!passwordError}
          helperText={passwordError}
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
          type="password"
          onChange={handleChange(setPassword)}
        />
        <GraphErrors error={error} />
        <Box display="flex" justifyContent="center" width="100%" marginTop={2}>
          {loading ? (
            <CircularProgress />
          ) : (
            <Button type="submit" variant="contained" color="primary">
              {t("login.submit")}
            </Button>
          )}
        </Box>
        {auth?.emulated && (
          <Box paddingY={3} display="flex" flexDirection="column">
            <Typography variant="button" align="center" gutterBottom={true}>
              {t("common.or")}
            </Typography>
            <Box display="flex" justifyContent="center" width="100%">
              <Button
                color="primary"
                variant="outlined"
                component={Link}
                to="/onboarding/email"
              >
                {t("task.finishRegistration")}
              </Button>
            </Box>
          </Box>
        )}
      </form>
    </Container>
  );
}

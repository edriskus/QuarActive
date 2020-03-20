import React, { useCallback, FormEvent, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  TextField,
  CircularProgress
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { useMutation } from "@apollo/react-hooks";
import { login } from "../../graphql/Auth";
import { useAuth } from "../../utils/Auth";
import { Auth } from "../../types/Auth";
import { handleChange } from "../../utils/Form";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAuth } = useAuth();
  const { t } = useTranslation();

  const [doLogin, { loading }] = useMutation(login, {
    onCompleted: ({ login }: { login: Auth }) => {
      setAuth(login);
    }
  });

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      doLogin({
        variables: { email, password }
      });
    },
    [doLogin, email, password]
  );

  return (
    <Container maxWidth="sm">
      <Box display="flex" justifyContent="center" width="100%" marginTop={2}>
        <img height="200px" alt={t("login.title")} />
      </Box>
      <Typography align="center" variant="h1" gutterBottom={true}>
        {t("login.title")}
      </Typography>
      <Typography align="center" variant="body1" gutterBottom={true}>
        {t("login.description")}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          value={email}
          margin="normal"
          fullWidth={true}
          variant="outlined"
          onChange={handleChange(setEmail)}
        />
        <TextField
          value={password}
          margin="normal"
          fullWidth={true}
          variant="outlined"
          type="password"
          onChange={handleChange(setPassword)}
        />
        <Box display="flex" justifyContent="center" width="100%" marginTop={2}>
          {loading ? (
            <CircularProgress />
          ) : (
            <Button type="submit" variant="contained" color="primary">
              {t("login.submit")}
            </Button>
          )}
        </Box>
      </form>
    </Container>
  );
}

import React, { useCallback, FormEvent } from "react";
import { Container, Box, Typography, Button } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { useMutation } from "@apollo/react-hooks";
import { login } from "../../graphql/Auth";
import { useAuth } from "../../utils/Auth";
import { Auth } from "../../types/Auth";

export default function Login() {
  const { setAuth } = useAuth();
  const [doLogin] = useMutation(login, {
    onCompleted: ({ login }: { login: Auth }) => {
      setAuth(login);
    }
  });

  const { t } = useTranslation();
  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      doLogin({
        variables: { email: "edmundas@riskus.lt", password: "password" }
      });
    },
    [doLogin]
  );
  return (
    <Container>
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
        <Box display="flex" justifyContent="center" width="100%" marginTop={2}>
          <Button type="submit" variant="contained" color="primary">
            {t("login.submit")}
          </Button>
        </Box>
      </form>
    </Container>
  );
}

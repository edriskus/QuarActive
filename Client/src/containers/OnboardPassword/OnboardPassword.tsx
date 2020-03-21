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
import { LockOutlined } from "@material-ui/icons";
import { handleChange } from "../../utils/Form";

interface Props {
  initialValue?: string;
  onChange(password: string): void;
}

export default function OnboardPassword({ initialValue, onChange }: Props) {
  const { t } = useTranslation();

  const [password, setPassword] = useState(initialValue ?? "");

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      // validate
      onChange(password);
    },
    [onChange, password]
  );

  return (
    <Container maxWidth="sm">
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
        marginTop={4}
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
        <Box display="flex" justifyContent="center" width="100%" marginTop={4}>
          <Grid container={true} spacing={3}>
            <Grid item={true} xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                fullWidth={true}
              >
                {t("common.finish")}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </Container>
  );
}

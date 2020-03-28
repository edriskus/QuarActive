import React, { useState, useCallback, FormEvent, useEffect } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  Tabs,
  Tab,
  TextField,
  IconButton,
  MenuItem,
  CircularProgress,
  Button
} from "@material-ui/core";
import ScrollTop from "../../components/ScrollTop/ScrollTop";
import { local } from "../../utils/Translation";
import BackgroundRibbon from "../../components/BackgroundRibbon/BackgroundRibbon";
import { Locale, TranslatedString } from "../../types/Translation";
import { useParams, Link, useHistory } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { getTask, changeTask } from "../../graphql/Task";
import { Task } from "../../types/Task";
import Skeleton from "@material-ui/lab/Skeleton";
import { useTranslation } from "react-i18next";
import { handleChange, handleTranslatedChange } from "../../utils/Form";
import { ArrowBack } from "@material-ui/icons";
import { resolveTaskImage } from "../../utils/Task";
import GraphErrors from "../../components/GraphErrors/GraphErrors";
import { withoutTypename } from "../../utils/Graph";

const localeMap = {
  en: 0,
  lt: 1,
  0: "en",
  1: "lt"
};

const emptyTranslated: TranslatedString = {
  en: "",
  lt: ""
};

const covers: string[] = [
  "/assets/Education.png",
  "/assets/Fun.png",
  "/assets/Health.png",
  "/assets/Household.png",
  "/assets/Hygiene.png",
  "/assets/Museum.png",
  "/assets/Time-With-Family.png",
  "/assets/Work-Out.png"
];

export default function EditTask() {
  const [locale, setLocale] = useState<Locale>("en");
  const [title, setTitle] = useState<TranslatedString>(emptyTranslated);
  const [healthTip, setHealthTip] = useState<TranslatedString>(emptyTranslated);
  const [cover, setCover] = useState<string>("/assets/Fun.png");
  const [description, setDescription] = useState<TranslatedString>(
    emptyTranslated
  );
  const { t } = useTranslation();
  const { push } = useHistory();

  const params = useParams<{ taskId: string }>();
  const { data } = useQuery<{ task: Task }>(getTask, {
    fetchPolicy: "network-only",
    variables: {
      taskId: params.taskId
    }
  });

  const [doChange, { loading, error }] = useMutation(changeTask, {
    onCompleted: () => push("/admin"),
    variables: {
      taskId: params.taskId,
      title,
      description,
      cover,
      healthTip
    }
  });

  useEffect(() => {
    if (data?.task?.title) {
      setTitle(withoutTypename(data.task.title));
    }
    if (data?.task?.description) {
      setDescription(withoutTypename(data.task.description));
    }
    if (data?.task?.healthTip) {
      setHealthTip(withoutTypename(data.task.healthTip));
    }
    if (data?.task?.cover) {
      setCover(data.task.cover);
    }
  }, [data]);

  const handleLocale = useCallback((event: any, value: number) => {
    setLocale((localeMap as Record<number, Locale>)[value]);
  }, []);

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      doChange();
    },
    [doChange]
  );

  return (
    <Container maxWidth="md">
      <ScrollTop />
      <Box
        paddingY={3}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <IconButton color="primary" component={Link} to="/admin">
          <ArrowBack />
        </IconButton>
        {data?.task ? (
          <Typography align="center" variant="h3" color="primary">
            {local(data.task.title, locale)}
          </Typography>
        ) : (
          <Skeleton variant="rect" width="100%" height={50} />
        )}
      </Box>
      <Card>
        <Tabs
          value={localeMap[locale]}
          onChange={handleLocale}
          variant="fullWidth"
        >
          <Tab label="English" />
          <Tab label="Lietuviškai" />
        </Tabs>
        <CardContent>
          {!!data?.task ? (
            <form onSubmit={handleSubmit}>
              <TextField
                key={`input.title.${locale}`}
                value={title[locale]}
                margin="normal"
                label={t("task.title")}
                variant="outlined"
                fullWidth={true}
                onChange={handleTranslatedChange(setTitle, locale)}
              />
              <TextField
                key={`input.description.${locale}`}
                value={description[locale]}
                margin="normal"
                label={t("task.description")}
                fullWidth={true}
                multiline={true}
                rows={5}
                rowsMax={10}
                variant="outlined"
                onChange={handleTranslatedChange(setDescription, locale)}
              />
              <TextField
                key={`input.healthTip.${locale}`}
                value={healthTip[locale]}
                margin="normal"
                label={t("task.healthTip")}
                fullWidth={true}
                multiline={true}
                rows={3}
                rowsMax={5}
                variant="outlined"
                onChange={handleTranslatedChange(setHealthTip, locale)}
              />
              <Box
                display="flex"
                justifyContent="center"
                width="100%"
                paddingY={4}
              >
                <img
                  src={resolveTaskImage({ cover })}
                  height={250}
                  alt={t("task.cover")}
                />
              </Box>
              <TextField
                key={`input.cover`}
                value={cover}
                margin="normal"
                select={true}
                label={t("task.cover")}
                fullWidth={true}
                multiline={true}
                rows={3}
                rowsMax={5}
                variant="outlined"
                onChange={handleChange(setCover)}
              >
                {covers.map(cover => (
                  <MenuItem key={cover} value={cover}>
                    {cover}
                  </MenuItem>
                ))}
              </TextField>
              <GraphErrors error={error} />
              <Box
                display="flex"
                justifyContent="center"
                width="100%"
                marginTop={2}
              >
                {loading ? (
                  <CircularProgress />
                ) : (
                  <Button type="submit" variant="contained" color="primary">
                    {t("login.submit")}
                  </Button>
                )}
              </Box>
            </form>
          ) : (
            <Skeleton variant="rect" width="100%" height={50} />
          )}
        </CardContent>
      </Card>
      <BackgroundRibbon />
    </Container>
  );
}

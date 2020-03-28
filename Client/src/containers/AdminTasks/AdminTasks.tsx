import React from "react";
import MUIDataTable, {
  MUIDataTableOptions,
  MUIDataTableColumnDef
} from "mui-datatables";
import { Container, Box, Typography, IconButton } from "@material-ui/core";
import ScrollTop from "../../components/ScrollTop/ScrollTop";
import { useTranslation } from "react-i18next";
import { useQuery } from "@apollo/react-hooks";
import { Task } from "../../types/Task";
import { getTasks } from "../../graphql/Task";
import CardSkeleton from "../../components/CardSkeleton/CardSkeleton";
import { UserType } from "../../types/Auth";
import { PersonalityTraitType } from "../../types/Persona";
import { Locale } from "../../types/Translation";
import { useLocale } from "../../utils/Translation";
import { Edit } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { TFunction } from "i18next";
import BackgroundRibbon from "../../components/BackgroundRibbon/BackgroundRibbon";

const columns = (l: Locale, t: TFunction): MUIDataTableColumnDef[] => [
  { name: `title.${l}`, label: t("task.title"), options: { filter: false } },
  {
    name: `difficulty`,
    label: t("task.difficulty"),
    options: {
      customBodyRender: (value: string) => t(`difficulty.${value}`)
    }
  },
  { name: `checkpoints.length`, label: t("task.checkpoints") },
  {
    name: `id`,
    label: t("task.edit"),
    options: {
      filter: false,
      customBodyRender: (id: string) => (
        <Box height="1em" display="flex" alignItems="center">
          <IconButton component={Link} to={`/admin/edit/${id}`}>
            <Edit />
          </IconButton>
        </Box>
      )
    }
  }
];

const options: MUIDataTableOptions = {
  filterType: "checkbox",
  selectableRows: "none",
  viewColumns: false,
  responsive: "scrollMaxHeight",
  print: false,
  rowsPerPage: 8,
  rowsPerPageOptions: [8, 12, 16]
};

const types = [UserType.Young, UserType.Teen, UserType.Family];

const traits = [
  PersonalityTraitType.Fitness,
  PersonalityTraitType.Cooking,
  PersonalityTraitType.Travel,
  PersonalityTraitType.Books,
  PersonalityTraitType.Music,
  PersonalityTraitType.Games,
  PersonalityTraitType.Pets,
  PersonalityTraitType.Kids
];

export default function AdminTasks() {
  const { t } = useTranslation();
  const { locale } = useLocale();
  const { data } = useQuery<{ tasks: Task[] }>(getTasks, {
    variables: {
      traits,
      types
    }
  });
  return (
    <Container maxWidth="lg">
      <ScrollTop />
      <Box paddingY={3}>
        <Typography align="center" variant="h3" color="primary">
          {t("admin.allTasks")}
        </Typography>
      </Box>
      {!!data?.tasks ? (
        <MUIDataTable
          title={""}
          data={data?.tasks}
          columns={columns(locale, t)}
          options={options}
        />
      ) : (
        <CardSkeleton />
      )}
      <BackgroundRibbon />
    </Container>
  );
}

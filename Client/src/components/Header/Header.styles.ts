import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    backgroundColor: theme.palette.background.default
  },
  wrapper: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  centered: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row"
  },
  customButton: {
    padding: theme.spacing(0.5)
  }
}));

import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    display: "flex",
    flexDirection: "row"
  },
  traitIcon: {
    fontSize: 12
  },
  traitTitle: {
    textTransform: "capitalize",
    marginLeft: theme.spacing(0.5)
  }
}));

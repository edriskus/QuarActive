import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  skeleton: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "rgba(0, 0, 0, 0.1) !important"
  }
}));

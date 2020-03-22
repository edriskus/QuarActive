import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  blob: {
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(141.27deg, #A3D9C6 9.14%, #B879C5 78.51%);",
    color: theme.palette.primary.contrastText
  }
}));

import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  card: {},
  imageCard: {
    height: 140,
    borderRadius: theme.shape.borderRadius,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundSize: "contain",
    backgroundColor: theme.palette.background.default,
    transition: theme.transitions.create([
      "width",
      "top",
      "left",
      "border-radius",
      "height"
    ]),
    width: `100%`,
    left: 0
  },
  imageCardFixed: {
    position: "fixed",
    zIndex: theme.zIndex.appBar + 1
  },
  imageCardOverlaid: {
    position: "fixed",
    height: 300,
    width: "100vw",
    borderRadius: 0,
    top: 0,
    left: 0
  }
}));

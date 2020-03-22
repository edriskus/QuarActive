import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  card: {},
  imageCard: {
    borderRadius: theme.shape.borderRadius,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundSize: "auto 80%",
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
  cardContent: {
    padding: 0
  },
  imageCardFixed: {
    position: "fixed",
    zIndex: theme.zIndex.appBar + 1
  },
  imageCardOverlaid: {
    position: "fixed",
    width: "100vw",
    borderRadius: 0,
    top: 0,
    left: 0
  }
}));

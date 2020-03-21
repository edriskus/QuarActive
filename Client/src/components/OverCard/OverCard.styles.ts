import { makeStyles, Theme } from "@material-ui/core/styles";

const height = `calc(100vh - 200px)`;

export const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    height: "100vh",
    position: "fixed",
    backgroundColor: "rgba(0,0,0,0)",
    left: 0,
    top: 0,
    zIndex: theme.zIndex.appBar + 1
  },
  overlay: {
    height: "100vh",
    width: "100vw",
    position: "fixed",
    backgroundColor: "rgba(0,0,0,0)",
    left: 0,
    top: 0,
    zIndex: 0,
    transition: theme.transitions.create("background-color")
  },
  overlayOpen: {
    backgroundColor: "rgba(0,0,0,.2)"
  },
  card: {
    marginTop: 200,
    zIndex: 1,
    position: "relative",
    minHeight: height,
    width: "100vw",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  cardContent: {
    display: "flex",
    flexDirection: "column"
  }
}));

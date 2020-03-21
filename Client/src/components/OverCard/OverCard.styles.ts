import { makeStyles, Theme } from "@material-ui/core/styles";

const height = `70vh`;

export const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    height: "100vh",
    position: "fixed",
    left: 0,
    top: 0,
    zIndex: theme.zIndex.appBar + 1
  },
  card: {
    marginTop: "30vh",
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

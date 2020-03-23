import { makeStyles, Theme } from "@material-ui/core/styles";
import Waves from "../../illustrations/waves.png";

export const useStyles = makeStyles((theme: Theme) => ({
  ribbon: {
    position: "fixed",
    zIndex: -1,
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: `url(${Waves})`,
    backgroundSize: "contain",
    backgroundPosition: "bottom center",
    backgroundRepeat: "no-repeat"
  }
}));

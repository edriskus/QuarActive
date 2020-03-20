import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

export default createMuiTheme({
  typography: {
    fontFamily: `'Montserrat'`,
    h3: {
      fontWeight: 600,
      fontSize: 20
    },
    h4: {
      fontWeight: 600,
      fontSize: 16
    },
    body2: {
      fontSize: 11
    },
    caption: {
      fontSize: 9
    },
    body1: {
      fontSize: 14,
      lineHeight: 1.2
    }
  },
  palette: {
    primary: {
      main: "#FFD749"
    },
    background: {
      default: "#FFF"
    },
    secondary: red
  },
  overrides: {
    MuiCard: {
      root: {
        borderRadius: 20
      }
    }
  }
});

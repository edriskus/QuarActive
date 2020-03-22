import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

export default responsiveFontSizes(
  createMuiTheme({
    palette: {
      primary: {
        main: "#B879C5"
      },
      secondary: {
        main: "#4ba486"
      },
      background: {
        default: "#fff"
      }
    },
    typography: {
      fontFamily: "'Montserrat', sans-serif;",
      button: {
        fontSize: 17
      },
      body1: {
        fontSize: 15
      },
      h2: {
        fontSize: 72,
        fontWeight: 600
      },
      h3: {
        fontSize: 32,
        fontWeight: 600
      },
      h4: {
        fontSize: 24,
        fontWeight: 600
      },
      h5: {
        fontSize: 20,
        fontWeight: 600
      },
      h6: {
        fontSize: 14,
        fontWeight: 600
      }
    },
    shape: {
      borderRadius: 12
    },
    overrides: {
      MuiButton: {
        root: {
          padding: "13px 26px"
        },
        outlined: {
          padding: "13px 26px"
        }
      },
      MuiStepper: {
        root: {
          backgroundColor: "rgba(0,0,0,0)"
        }
      },
      MuiStepLabel: {
        labelContainer: {
          display: "none"
        }
      }
    }
  })
);

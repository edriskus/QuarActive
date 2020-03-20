import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

export default responsiveFontSizes(
  createMuiTheme({
    palette: {
      primary: {
        main: "#4ba486"
      },
      secondary: {
        main: "#f8e823"
      }
    }
  })
);

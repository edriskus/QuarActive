import React from "react";
import { ThemeProvider, CssBaseline, Box } from "@material-ui/core";
import LightTheme from "../../styles/LightTheme";
import { client } from "../../utils/Apollo";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "../Routes/Routes";
import Header from "../../components/Header/Header";
import { AuthProvider } from "../../utils/Auth";
import CookieBar from "../CookieBar/CookieBar";
import { LocaleProvider } from "../../utils/Translation";

function App() {
  return (
    <LocaleProvider>
      <ApolloProvider client={client}>
        <AuthProvider>
          <ThemeProvider theme={LightTheme}>
            <CssBaseline />
            <Router>
              <Header />
              <Box paddingBottom={6}>
                <Routes />
              </Box>
              <CookieBar />
            </Router>
          </ThemeProvider>
        </AuthProvider>
      </ApolloProvider>
    </LocaleProvider>
  );
}

export default App;

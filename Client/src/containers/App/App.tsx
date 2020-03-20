import React from "react";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import LightTheme from "../../styles/LightTheme";
import { client } from "../../utils/Apollo";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "../Routes/Routes";
import Header from "../../components/Header/Header";
import { AuthProvider } from "../../utils/Auth";
import CookieBar from "../CookieBar/CookieBar";

function App() {
  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        <ThemeProvider theme={LightTheme}>
          <CssBaseline />
          <Router>
            <Header />
            <Routes />
            <CookieBar />
          </Router>
        </ThemeProvider>
      </ApolloProvider>
    </AuthProvider>
  );
}

export default App;

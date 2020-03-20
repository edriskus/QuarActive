import React from "react";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import LightTheme from "../../styles/LightTheme";
import { client } from "../../utils/Apollo";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "../Routes/Routes";
import Header from "../../components/Header/Header";

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={LightTheme}>
        <CssBaseline />
        <Router>
          <Header />
          <Routes />
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;

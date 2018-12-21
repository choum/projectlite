import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Landing from "./page/Landing";
import About from "./page/About";
import Registration from "./page/Registration";
import Dashboard from "./page/Dashboard";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { WrapContainer } from "./components/Container";

const Routes = () => {
  return (
    <Router>
      <React.Fragment>
        <WrapContainer>
          <Header />
          <Route exact path="/" component={Landing} />
          <Route exact path="/home" component={Landing} />
          <Route exact path="/about" component={About} />
          <Route exact path="/registration" component={Registration} />
          <Route exact path="/dashboard" component={Dashboard} />
        </WrapContainer>
        <Footer />
      </React.Fragment>
    </Router>
  );
};

export default Routes;

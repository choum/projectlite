import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Landing from "./page/Landing";
import About from "./page/About";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

const Routes = () => {
  return (
    <Router>
      <React.Fragment>
        <Header />

        <Route exact path="/" component={Landing} />
        <Route exact path="/home" component={Landing} />
        <Route exact path="/about" component={About} />

        <Footer />
      </React.Fragment>
    </Router>
  );
};

export default Routes;

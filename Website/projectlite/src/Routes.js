import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Landing from "./page/Landing";
import About from "./page/About";
import Registration from "./page/Registration";
import Dashboard from "./page/Dashboard";
import Login from "./page/Login";
import Signout from "./page/Signout";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { WrapContainer } from "./components/Container";
import Emulator from "./page/Emulator";

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: true
    };
  }

  render() {
    return (
      <Router>
        <React.Fragment>
          <WrapContainer>
            <Header login={this.state.isLoggedIn} />
            <Route exact path="/" component={Landing} />
            <Route exact path="/home" component={Landing} />
            <Route exact path="/about" component={About} />
            <Route exact path="/registration" component={Registration} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signout" component={Signout} />
            <Route exact path="/emu" component={Emulator} />
          </WrapContainer>
          <Footer />
        </React.Fragment>
      </Router>
    );
  }
}

export default Routes;

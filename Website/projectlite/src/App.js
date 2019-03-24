import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import HexagonProfile from "./page/HexagonProfile";
import Landing from "./page/Landing";
import About from "./page/About";
import Dashboard from "./page/Dashboard";
import Login from "./page/Login";
import SignOut from "./page/SignOut";
import Emulator from "./page/Emulator";
import SignUp from "./page/SignUp";
import ForgotPassword from "./page/ForgotPassword";
import Settings from "./page/Settings";

import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { WrapContainer } from "./components/Container";

import * as ROUTES from "./constants/routes";
import { withAuthentication } from "./components/Session";

const App = () => (
  <Router>
    <WrapContainer>
      <Header />
      <Switch>
        <Route exact path={ROUTES.LANDING} component={Landing} />
        <Route path={ROUTES.ABOUT} component={About} />
        <Route path={ROUTES.DASHBOARD} component={Dashboard} />
        <Route path={ROUTES.LOGIN} component={Login} />
        <Route path={ROUTES.SETTINGS} component={Settings} />
        <Route path={ROUTES.SIGNOUT} component={SignOut} />
        <Route path={ROUTES.SIGNUP} component={SignUp} />
        <Route path={ROUTES.EMULATOR} component={Emulator} />
        <Route path={ROUTES.HEXAGONPROFILE} component={HexagonProfile} />
        <Route path={ROUTES.FORGOTPASSWORD} component={ForgotPassword} />
      </Switch>
      <Footer />
    </WrapContainer>
  </Router>
);

export default withAuthentication(App);

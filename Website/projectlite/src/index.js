import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Firebase, { FirebaseContext } from "./components/Firebase";

import Landing from "./page/Landing";
import About from "./page/About";
import Registration from "./page/Registration";
import Dashboard from "./page/Dashboard";
import Login from "./page/Login";
import Signout from "./page/Signout";
import HexagonProfile from "./page/HexagonProfile";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { WrapContainer } from "./components/Container";
import Emulator from "./page/Emulator";
import SignUp from "./page/SignUp";

import * as ROUTES from "./constants/routes";

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <Router>
      <WrapContainer>
        <Header login={false} />
        <Switch>
          <Route exact path={ROUTES.LANDING} component={Landing} />
          <Route path={ROUTES.ABOUT} component={About} />
          <Route path={ROUTES.REGISTRATION} component={Registration} />
          <Route path={ROUTES.DASHBOARD} component={Dashboard} />
          <Route path={ROUTES.LOGIN} component={Login} />
          <Route path={ROUTES.SIGNOUT} component={Signout} />
          <Route path={ROUTES.SIGNUP} component={SignUp} />
          <Route path={ROUTES.EMULATOR} component={Emulator} />
          <Route path={ROUTES.HEXAGONPROFILE} component={HexagonProfile} />
        </Switch>
        <Footer />
      </WrapContainer>
    </Router>
  </FirebaseContext.Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

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

import * as ROUTES from "./constants/routes";

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <Router>
      <WrapContainer>
        <Header login={true} />
        <Route exact path="/" component={Landing} />
        <Route exact path="/home" component={Landing} />
        <Route exact path="/about" component={About} />
        <Route exact path="/registration" component={Registration} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/hexagon" component={HexagonProfile} />
        <Route exact path="/signout" component={Signout} />
        <Route exact path="/emu" component={Emulator} />
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

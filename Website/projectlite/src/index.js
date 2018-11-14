import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";

import Landing from "./page/Landing";
import About from "./page/About";
import Routes from "./Routes";
import Registration from "./page/Registration";

ReactDOM.render(<Routes />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

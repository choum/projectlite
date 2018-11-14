import React from "react";
import { NavLink } from "react-router-dom";

import Routes from "../../Routes";

import "./stylesHeader.css";

const Header = () => {
  return (
    <div className="masthead clearfix">
      <div className="container">
        <h3 className="masthead-brand">Project Lite</h3>
        <nav>
          <ul className="nav masthead-nav">
            <li>
              <NavLink to="/home" activeClassName="active">
                Home
              </NavLink>
            </li>
            <li>
              <a href="features.html">Features</a>
            </li>
            <li>
              <a href="login.html">Login</a>
            </li>
            <li>
              <NavLink to="/about" activeClassName="active">
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/registration" activeClassName="active">
                Register
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;

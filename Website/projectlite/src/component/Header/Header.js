import React from "react";
import { Link } from "react-router-dom";

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
              <Link to="/home">Home</Link>
            </li>
            <li className="active">
              <a href="features.html">Features</a>
            </li>
            <li>
              <a href="login.html">Login</a>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <a href="register.html">Register</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;

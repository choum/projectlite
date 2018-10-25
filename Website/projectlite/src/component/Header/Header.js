import React from "react";

import styles from "./headerStyle";

const Header = () => {
  return (
    <div>
      <h3>Project Lite</h3>
      <nav>
        <ul className="nav masthead-nav">
          <li>
            <a href="index.html">Home</a>
          </li>
          <li className="active">
            <a href="features.html">Features</a>
          </li>
          <li>
            <a href="login.html">Login</a>
          </li>
          <li>
            <a href="about.html">About</a>
          </li>
          <li>
            <a href="register.html">Register</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;

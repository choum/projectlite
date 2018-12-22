import React from "react";
import { NavLink } from "react-router-dom";

import Routes from "../../Routes";
import styled from "styled-components";

const Head = styled.div`
.masthead-nav,
.masthead-brand {
  margin-top: 20px;
  margin-bottom: 20px;
}

.masthead-nav > li {
  margin-top: 3px;
  display: inline-block;
}
.masthead-nav > li + li {
  margin-left: 20px;
}
.masthead-nav > li > a {
  padding-right: 0;
  padding-left: 0;
  font-size: 16px;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.75);
  border-bottom: 2px solid transparent;
}

/* .masthead-nav > li > a:hover,
.masthead-nav > li > a:focus {
  background-color: transparent;
  border-bottom-color: #a9a9a9;
  border-bottom-color: rgba(255, 255, 255, 0.25);
} */
/* .masthead-nav > .active > a,
.masthead-nav > .active > a:hover,
.masthead-nav > .active > a:focus {
  color: #fff;
  border-bottom-color: #fff;
} */

.active {
  color: #fff !important;
  border-bottom-color: #fff !important;
}

@media (min-width: 768px) {
  .masthead-brand {
    float: left;
    vertical-align: middle;
    color: #fff;
  }
  .masthead-nav {
    float: right;
    vertical-align: middle;
  }
}

.container .cover {
  text-align: center;
  color: #fff;
}

/* end header */

@media (min-width: 768px) {
  /* Pull out the header and footer */
  .masthead {
    position: fixed;
    top: 0;
    width: 100%;
    background-color: #282828;
    z-index: 999;
  }

  /* removed .site-wrapper-inner */
}

`

const Header = () => {
  return (
    <Head>
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
              <a href="/login">Login</a>
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
    </Head>
  );
};

export default Header;

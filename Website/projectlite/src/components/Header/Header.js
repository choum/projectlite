import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import styled from "styled-components";

import { withFirebase } from "../../components/Firebase";

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
`;

// @TODO if not logged in, Home | Products | Login | About | Register
// @TODO if logged in, Home | Products | About | Dashboard | Settings | Signout
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false
    };

    this.firebase = this.props.firebase;
    this.firebase.AuthStateChange.RegisterHandler(e => {
      this.setState({
        signedIn: this.firebase.getCurrentUser() !== undefined
      });
    });
  }
  render() {
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
                  <a href="features.html">Products</a>
                </li>
                {!this.state.signedIn && (
                  <li>
                    <NavLink to="/login" activeClassName="active">
                      Login
                    </NavLink>
                  </li>
                )}
                <li>
                  <NavLink to="/about" activeClassName="active">
                    About
                  </NavLink>
                </li>
                {!this.state.signedIn && (
                  <li>
                    <NavLink to="/registration" activeClassName="active">
                      Register
                    </NavLink>
                  </li>
                )}
                {this.state.signedIn && (
                  <li>
                    <NavLink to="/dashboard" activeClassName="active">
                      Dashboard
                    </NavLink>
                  </li>
                )}
                {this.state.signedIn && (
                  <li>
                    <NavLink to="/settings" activeClassName="active">
                      Settings
                    </NavLink>
                  </li>
                )}
                {this.state.signedIn && (
                  <li>
                    <NavLink to="/signout" activeClassName="active">
                      Signout
                    </NavLink>
                  </li>
                )}
                <li>
                  <NavLink to="/emu" activeClassName="active">
                    Emulator
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </Head>
    );
  }
}

export default withFirebase(Header);

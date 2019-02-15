import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import styled from "styled-components";
import { withFirebase } from "../../components/Firebase";
import { bubble as Menu } from "react-burger-menu";

const Head = styled.div`
  .masthead-nav,
  .masthead-brand {
    margin-top: 20px;
    margin-bottom: 20px;
    font-weight: normal;
    display:block;
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
    color: rgba(0, 0, 0, 0.75);
    border-bottom: 2px solid transparent;
  }

  .row {
    width: 100%
    margin-left: 10px;
    margin-right: 10px;
  }

  .active {
    color: #000 !important;
    border-bottom-color: #000 !important;
  }

  .masthead-brand {
    float: left;
    vertical-align: middle;
    color: #000;
    display:block;
  }

  .masthead-nav {
    float: right;
    vertical-align: middle;
    display:block;
  }

  .container .cover {
    text-align: center;
    color: #000;
    display:block;
  }

  /* end header */

    /* Pull out the header and footer */
    .masthead {
      position: fixed;
      top: 0;
      width: 100%;
      background-color: #F7F7F7;
      overflow:hidden;
      display:block;
    /* removed .site-wrapper-inner */
  }

  .item-list {
    float:right;
  }
  
  .logo {
    float: left;
  }
  
  ul {
    margin-top: 0px;
  }

  .bm-burger-button {
    position: absolute;
    width: 36px;
    height: 30px;
    left: 18px;
    top: 22px;
  }

  /* Color/shape of burger icon bars */
  .bm-burger-bars {
    background: #373a47;

  }

  .bm-burger-bars-hover {
    background: #a90000;
  }

  /* Position and sizing of clickable cross button */
  .bm-cross-button {
    height: 24px;
    width: 24px;
  }

  /* Color/shape of close button cross */
  .bm-cross {
    background: #bdc3c7;
  }

  /*
  Sidebar wrapper styles
  Note: Beware of modifying this element as it can break the animations - you should not need to touch it in most cases
  */
  .bm-menu-wrap {
    position: fixed;
    height: 100%;
  }

  /* General sidebar styles */
  .bm-menu {
    background: #282828;
    padding: 2.5em 1.5em 0;
    font-size: 1.15em;
  }

  /* Morph shape necessary with bubble or elastic */
  .bm-morph-shape {
    fill: #282828;
  }

  /* Wrapper for item list */
  .bm-item-list {
    padding: 0.8em;
  }

  /* Individual item */
  .bm-item {
    display: inline-block;
  }

  /* Styling of overlay */
  .bm-overlay {
    background: rgba(0, 0, 0, 0.3);
  }

  .menu-item {
    color: #fff !important;
    font-size: 16pt;
    padding: 0.3em;
  }

  .navbar {
    padding-top: 0px;
    padding-bottom: 0px;
  }

  @media (min-width: 894px) {
    .outer-container {
      display: none;
    }
  }

  @media (max-width: 894px) {
    .navbar {
      display: none;
    }
    .bm-burger-bars {
      background: #b3b3cc;
    }
  }
  
  .outer-container {
    height: 73px;
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
    // this.firebase.AuthStateChange.RegisterHandler(e => {
    //   this.setState({
    //     signedIn: this.firebase.getCurrentUser() !== undefined
    //   });
    // });
  }

  render() {
    return (
      <Head>
        <div className="outer-container">
          <Menu left isOpen={false}>
            <NavLink exact to="/" className="menu-item">
              Home
            </NavLink>
            <NavLink to="/products" className="menu-item">
              Products
            </NavLink>
            <NavLink to="/about" className="menu-item">
              About
            </NavLink>
            {!this.state.signedIn && (
              <NavLink to="/login" className="menu-item">
                Login
              </NavLink>
            )}
            {!this.state.signedIn && (
              <NavLink to="/sign-up" className="menu-item">
                Sign Up
              </NavLink>
            )}
            {this.state.signedIn && (
              <NavLink to="/settings" className="menu-item">
                Settings
              </NavLink>
            )}
            {this.state.signedIn && (
              <NavLink to="/signout" className="menu-item">
                Signout
              </NavLink>
            )}
          </Menu>
        </div>
        <nav className="navbar navbar-light bg-light">
          <div className="row">
            <div className="col-md-4">
              <svg
                id="logo"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                width="60"
                height="52"
                viewBox="0 0 60 51.96152422706631"
                stroke="#000"
                fill="#F7F7F7"
                style={{ float: "left", marginTop: "10px", marginRight: "5px" }}
              >
                <path d="M0 25.980762113533157L15 0L45 0L60 25.980762113533157L45 51.96152422706631L15 51.96152422706631Z" />
              </svg>
              <h3 className="masthead-brand">Project Lite</h3>
            </div>
            <div className="col-md-8">
              <ul className="nav masthead-nav">
                <li>
                  <NavLink exact to="/">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/products">Products</NavLink>
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
                    <NavLink to="/sign-up" activeClassName="active">
                      Sign Up
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
            </div>
          </div>
        </nav>
      </Head>
    );
  }
}

export default withFirebase(Header);

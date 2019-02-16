import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import styled from "styled-components";
import { bubble as Menu } from "react-burger-menu";

const Head = styled.div`
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

  .bm-burger-bars {
    background: #b3b3cc;
  }

  .outer-container {
    height: 73px;
  }
`;

// @TODO if not logged in, Home | Products | Login | About | Register
// @TODO if logged in, Home | Products | About | Dashboard | Settings | Signout
class HeaderMobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false
    };
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
      </Head>
    );
  }
}

export default HeaderMobile;

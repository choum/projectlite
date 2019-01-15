import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import styled from "styled-components";
import { withFirebase } from "../../components/Firebase";

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
        <nav className="navbar navbar-light bg-light">
        <div className="row">
        <div className="col-md-5">
          <svg id="logo" version="1.1" xmlns="http://www.w3.org/2000/svg" width="60" height="52" viewBox="0 0 60 51.96152422706631" stroke="#000" fill="#F7F7F7" style={{float: 'left', marginTop: '10px', marginRight: '5px'}}>
            <path d="M0 25.980762113533157L15 0L45 0L60 25.980762113533157L45 51.96152422706631L15 51.96152422706631Z">
            </path>
          </svg>
          <h3 className="masthead-brand">Project Lite</h3>
          </div>
          <div className="col-md-7">
              <ul className="nav masthead-nav">
                <li>
                  <NavLink exact to="/" activeClassName="active">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/products" activeClassName="active">
                    Products
                  </NavLink>
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
            </div>
            </div>
        </nav>
      </Head>
    );
  }
}

export default withFirebase(Header);

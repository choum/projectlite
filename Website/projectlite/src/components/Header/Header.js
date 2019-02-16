import React, { Component } from "react";

import { HeaderMobile, HeaderDesktop } from "./index";

import { withFirebase } from "../../components/Firebase";
import { auth } from "firebase";

// @TODO if not logged in, Home | Products | Login | About | Register
// @TODO if logged in, Home | Products | About | Dashboard | Settings | Signout

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showHeaderDesktop: true
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  resize() {
    let showHeaderDesktop = window.innerWidth <= 894 ? false : true;
    this.setState({ showHeaderDesktop });
  }

  render() {
    return this.state.showHeaderDesktop ? <HeaderDesktop /> : <HeaderMobile />;
  }
}

export default withFirebase(Header);

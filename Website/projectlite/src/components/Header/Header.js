import React, { Component } from "react";

import { HeaderMobile, HeaderDesktop } from "./index";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showHeaderDesktop: true
    };
    this.resize = this.resize.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.resize);
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
  }

  resize() {
    let showHeaderDesktop = window.innerWidth <= 894 ? false : true;
    this.setState({ showHeaderDesktop });
  }

  render() {
    let authUser = this.props.authUser;

    return this.state.showHeaderDesktop ? (
      <HeaderDesktop authUser={authUser} />
    ) : (
      <HeaderMobile authUser={authUser} />
    );
  }
}

export default Header;

import React from "react";
import ReactDom from "react-dom";

import { LandingContainer } from "../component/Container";

class Landing extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <LandingContainer />
    );
  }
};

export default Landing;

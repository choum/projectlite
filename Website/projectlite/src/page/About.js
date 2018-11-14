import React, { Component } from "react";

import {
  RootContainer,
  Container,
  CardContainer
} from "../components/Container";

class About extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <RootContainer>
        <CardContainer title={["About"]} content={["About us"]} />
      </RootContainer>
    );
  }
}

export default About;

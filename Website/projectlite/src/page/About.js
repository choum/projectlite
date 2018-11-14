import React, { Component } from "react";

import {
  RootContainer,
  Container,
  CardContainer,
  MainContainer
} from "../components/Container";

class About extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MainContainer>
        <CardContainer title={["About"]} content={["About us"]} />
      </MainContainer>
    );
  }
}

export default About;

import React, { Component } from "react";

import {
  RootContainer,
  Container,
  MainContainer
} from "../components/Container";
import CardContainer from "../components/Container/CardContainer"

class About extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MainContainer>
        <CardContainer type="about" title={["About"]} content={["About us"]} />
      </MainContainer>
    );
  }
}

export default About;

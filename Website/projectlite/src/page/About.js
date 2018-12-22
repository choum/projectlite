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
        <CardContainer type="bodyheader">About us</CardContainer>
      </MainContainer>
    );
  }
}

export default About;

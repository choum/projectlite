import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
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
        <Container>
          <CardContainer title={["About"]} content={["About us"]} />
        </Container>
      </RootContainer>
    );
  }
}

export default About;

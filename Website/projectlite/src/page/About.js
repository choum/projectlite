import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { Header } from "../component/Header";
import { Footer } from "../component/Footer";
import {
  RootContainer,
  Container,
  CardContainer
} from "../component/Container";

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

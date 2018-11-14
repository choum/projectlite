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
        <Container>
          <CardContainer title={["About"]} content={["About us"]} />
        </Container>
      </RootContainer>
    );
  }
}

export default About;

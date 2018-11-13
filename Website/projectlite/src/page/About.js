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
      <React.Fragment>
        <Header />
        <RootContainer>
          <Container className="aboutMargin">
            <CardContainer title={["About"]} content={["About us"]} />
          </Container>
        </RootContainer>
        <Footer />
      </React.Fragment>
    );
  }
}

export default About;

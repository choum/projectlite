import React, { Component } from 'react';

import { RootContainer, SubContainer } from '../component/Container';
import { Header } from '../component/Header';

class Landing extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <RootContainer >
        <Header />
        <SubContainer
          h1Text="Project Lite."
          pText="Explore lighting in a whole new way."
          btnText="Learn More"
        />
      </RootContainer>
    );
  }
};

export default Landing;

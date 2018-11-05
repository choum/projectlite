import React, { Component } from 'react';

import { RootContainer } from '../component/Container';
import { Header } from '../component/Header';
import { Banner } from '../component/Banner';

class Landing extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <RootContainer >
        <Header />
        <Banner
          h1Text="Project Lite."
          pText="Explore lighting in a whole new way."
          btnText="Learn More"
        />
      </RootContainer>
    );
  }
};

export default Landing;

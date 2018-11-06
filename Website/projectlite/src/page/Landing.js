import React, { Component } from 'react';

import { Container, CardContainer } from '../component/Container';
import { Header } from '../component/Header';
import { Banner } from '../component/Banner';
import { Footer } from '../component/Footer';

class Landing extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <Container>
          <Header />
          <Banner
            h1Text="Project Lite."
            pText="Explore lighting in a whole new way."
            btnText="Learn More"
          />
        </Container>
        <CardContainer
          title={["Feature 1", "Feature 2", "Feature 3"]}
          content={
            [
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel magna mauris. Mauris nulla eros, consectetur ac nulla et, tempor convallis nibh. Praesent eget lobortis quam. Quisque at porta justo. In eget nunc leo. Cras convallis ornare ligula, non feugiat odio mattis id. Mauris leo orci, rhoncus ac lectus vel, porttitor mollis sapien. Quisque quis nibh non quam tincidunt feugiat.",
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel magna mauris. Mauris nulla eros, consectetur ac nulla et, tempor convallis nibh. Praesent eget lobortis quam. Quisque at porta justo. In eget    nunc leo. Cras convallis ornare ligula, non feugiat odio mattis id. Mauris leo orci, rhoncus ac lectus vel, porttitor mollis sapien. Quisque quis nibh non quam tincidunt feugiat.",
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel magna mauris. Mauris nulla eros, consectetur ac nulla et, tempor convallis nibh. Praesent eget lobortis quam. Quisque at porta justo. In eget nunc leo. Cras convallis ornare ligula, non feugiat odio mattis id. Mauris leo orci, rhoncus ac lectus vel, porttitor mollis sapien. Quisque quis nibh non quam tincidunt feugiat."
            ]}
        />
        <Footer />
      </React.Fragment>
    );
  }
};

export default Landing;

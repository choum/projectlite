import React, { Component } from "react";
import { FeaturesContainer, MainContainer } from "../components/Container";
import { Banner } from "../components/Banner";
import CardContainer from "../components/Container/CardContainer";

class Landing extends Component {
  render() {
    return (
      <MainContainer>
        <Banner
          h1Text="Project Lite"
          pText="Explore lighting in a whole new way."
          btnText="Learn More"
        />
        <FeaturesContainer>
          <div className="row">
            <div className="col-md-4">
              <CardContainer type="card" title="Feature 1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus vel magna mauris. Mauris nulla eros, consectetur ac
                nulla et, tempor convallis nibh. Praesent eget lobortis quam.
                Quisque at porta justo. In eget nunc leo. Cras convallis ornare
                ligula, non feugiat odio mattis id. Mauris leo orci, rhoncus ac
                lectus vel, porttitor mollis sapien. Quisque quis nibh non quam
                tincidunt feugiat.
              </CardContainer>
            </div>
            <div className="col-md-4">
              <CardContainer type="card" title="Feature 2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus vel magna mauris. Mauris nulla eros, consectetur ac
                nulla et, tempor convallis nibh. Praesent eget lobortis quam.
                Quisque at porta justo. In eget nunc leo. Cras convallis ornare
                ligula, non feugiat odio mattis id. Mauris leo orci, rhoncus ac
                lectus vel, porttitor mollis sapien. Quisque quis nibh non quam
                tincidunt feugiat.
              </CardContainer>
            </div>
            <div className="col-md-4">
              <CardContainer type="card" title="Feature 3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus vel magna mauris. Mauris nulla eros, consectetur ac
                nulla et, tempor convallis nibh. Praesent eget lobortis quam.
                Quisque at porta justo. In eget nunc leo. Cras convallis ornare
                ligula, non feugiat odio mattis id. Mauris leo orci, rhoncus ac
                lectus vel, porttitor mollis sapien. Quisque quis nibh non quam
                tincidunt feugiat.
              </CardContainer>
            </div>
          </div>
        </FeaturesContainer>
      </MainContainer>
    );
  }
}

export default Landing;

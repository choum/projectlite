import React, { Component } from "react";
import {
  RootContainer,
  DefaultContainer,
  FeaturesContainer,
  MainContainer
} from "../components/Container";
import LightsBox from "../components/LightsBox";
import QuickControl from "../components/QuickControl";
import CardContainer from "../components/Container/CardContainer";


class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MainContainer>
      <div class="row">
        <div class="col-md-8">
          <CardContainer type="card" title="Clusters">
          <LightsBox />
          <LightsBox />
          <LightsBox />
          </CardContainer>
        </div>
        <div class="col-md-4">
          <CardContainer type="card" title="Quick Control">
          <QuickControl/>
          </CardContainer>
        </div>
      </div>
      </MainContainer>
    );
  }
}
export default Dashboard;

import React, { Component } from "react";
import {
  RootContainer,
  DefaultContainer,
  FeaturesContainer,
  MainContainer
} from "../components/Container";
import LightsBox from "../components/LightsBox";



class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MainContainer>
      <div class="row">
        <div class="col-md-8">
          <LightsBox />
        </div>
        <div class="col-md-4">
        </div>
      </div>
      </MainContainer>
    );
  }
}
export default Dashboard;

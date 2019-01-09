import React, { Component } from "react";
import {
  RootContainer,
  DefaultContainer,
  FeaturesContainer,
  MainContainer,
  SlimContainer
} from "../components/Container";
import LightsBox from "../components/LightsBox";
import QuickControl from "../components/QuickControl";
import CardContainer from "../components/Container/CardContainer";

import { withFirebase } from "../components/Firebase";

// DEV ONLY
// implemention doesn't allow for hotswapping data
//import lightData from "../lightData.json";
import { stringify } from "querystring";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomValue: 0,
      listOfClusters: {},
      isLayoutLoaded: false
    };
    this.firebase = this.props.firebase;

    this.getLayout();
  }

  getLayout() {
    this.firebase.getCluster(val => {
      this.setState({
        listOfClusters: val,
        isLayoutLoaded: true
      });
    });
  }

  // resize cluster size based on total cluster count to fit
  // within cluster section of dashboard
  renderLightsBox() {
    let clusterList = this.state.listOfClusters;
    let cluster = Object.keys(this.state.listOfClusters);
    let lights = [];
    var clusterCount = cluster.length;
    var currentClusterIndex = 0;
    if (clusterCount % 2 == 1) {
      for (let k = 0; k < clusterCount - 1; k++) {
        let name = cluster[currentClusterIndex];
        lights.push(
          <div className="col-md-6" key={currentClusterIndex}>
            <LightsBox title={name} clusterData={clusterList[name]} />
          </div>
        );
        currentClusterIndex++;
      }
      let name = cluster[currentClusterIndex];
      lights.push(
        <div className="col-md-12" key={currentClusterIndex}>
          <LightsBox title={name} clusterData={clusterList[name]} />
        </div>
      );
      currentClusterIndex++;
    } else {
      for (let k = 0; k < clusterCount; k++) {
        let name = cluster[currentClusterIndex];
        lights.push(
          <div className="col-md-6" key={currentClusterIndex}>
            <LightsBox title={name} clusterData={clusterList[name]} />
          </div>
        );
        currentClusterIndex++;
      }
    }
    return lights;
  }

  render() {
    if (!this.state.isLayoutLoaded) {
      return (
        <MainContainer>
          <SlimContainer>
            <CardContainer type="card" title="Clusters">
              Loading...
            </CardContainer>
          </SlimContainer>
        </MainContainer>
      );
    }

    return (
      <MainContainer>
        <SlimContainer>
          <div className="row">
            <div className="col-md-8">
              <CardContainer type="card" title="Clusters">
                <div className="row">{this.renderLightsBox()}</div>
              </CardContainer>
            </div>
            <div className="col-md-4">
              <CardContainer type="card" title="Quick Control">
                <QuickControl
                  value={this.state.roomValue}
                  onChange={e => this.setState({ roomValue: e.target.value })}
                />
              </CardContainer>
            </div>
          </div>
        </SlimContainer>
      </MainContainer>
    );
  }
}
export default withFirebase(Dashboard);

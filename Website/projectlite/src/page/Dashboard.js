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

// DEV ONLY
// implemention doesn't allow for hotswapping data
import lightData from "../lightData.json";
import { stringify } from "querystring";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomValue: 0
    };
  }

  // resize cluster size based on total cluster count to fit
  // within cluster section of dashboard
  renderLightsBox() {
    let cluster = Object.keys(lightData);
    let lights = [];
    var clusterCount = 2;
    var currentClusterIndex = 0;
    if (clusterCount % 2 == 1) {
      let name = cluster[currentClusterIndex];
      for (let k = 0; k < clusterCount - 1; k++) {
        lights.push(
          <div className="col-md-6" key={currentClusterIndex}>
            <LightsBox title={name} clusterData={lightData[name]} />
          </div>
        );
        currentClusterIndex++;
      }
      lights.push(
        <div className="col-md-12" key={currentClusterIndex}>
          <LightsBox title={name} clusterData={lightData[name]} />
        </div>
      );
      currentClusterIndex++;
    } else {
      for (let k = 0; k < clusterCount; k++) {
        let name = cluster[currentClusterIndex];
        lights.push(
          <div className="col-md-6" key={currentClusterIndex}>
            <LightsBox title={name} clusterData={lightData[name]} />
          </div>
        );
        currentClusterIndex++;
      }
    }
    return lights;
  }

  render() {
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
                  onChange={e =>
                    this.setState({ roomValue: e.target.value }, () =>
                      console.log()
                    )
                  }
                />
              </CardContainer>
            </div>
          </div>
        </SlimContainer>
      </MainContainer>
    );
  }
}
export default Dashboard;

// handleChange = e => {
//   this.setState({ value: e.target.value }, () => {
//     console.log(this.state.value);
//   });
// };

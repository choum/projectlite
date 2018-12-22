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
    this.state = {
      roomValue: 0
    };
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

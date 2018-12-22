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

  renderLightsBox() {
    let lights = [];
    var i = 3;
    if (i % 2 ==  1) {
      for (let k = 0; k < i-1; k++) {
        lights.push(<div className="col-md-6"><LightsBox /></div>);

      }
      lights.push(<div className="col-md-12"><LightsBox /></div>);
    } else {
      for (let k = 0; k < i; k++) {
        lights.push(<div className="col-md-6"><LightsBox /></div>);

      }
    }
    return lights;

  }

  render() {
    return (
      <MainContainer>
      <div className="row">
        <div className="col-md-8">
          <CardContainer type="card" title="Clusters">
          <div className="row">
            {this.renderLightsBox()}
          </div>
          </CardContainer>
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
          <div class="col-md-4">
          </div>
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

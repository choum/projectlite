import React, { Component } from "react";
import { Alert } from "reactstrap";

import {
  MainContainer,
  SlimContainer,
  CardContainer
} from "../components/Container";
import { HexLayout } from "../components/Layout";
import { QuickSlider } from "../components/Slider";

import { withAuthorization } from "../components/Session";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertVisble: true,
      roomValue: 0,
      listOfClusters: {},
      quickControlValues: [],
      isLayoutLoaded: false,
      userName: null
    };
    this.onAlertDismiss = this.onAlertDismiss.bind(this);
    this.firebase = this.props.firebase;
  }

  componentDidMount() {
    this.dbref = this.getLayout();
    this.setState({ userName: this.firebase.getCurrentUser().email });
  }

  componentWillUnmount() {
    this.dbref.off();
  }

  onAlertDismiss() {
    this.setState({ alertVisble: false });
  }

  getLayout() {
    return this.firebase.getClusters(val => {
      this.setState({
        listOfClusters: val,
        quickControlValues: Array(Object.keys(val).length).fill(0),
        isLayoutLoaded: true
      });
    });
  }

  // resize cluster size based on total cluster count to fit
  // within cluster section of dashboard
  renderLightsBox() {
    let clusterList = this.state.listOfClusters;
    let clusterUIDList = Object.keys(this.state.listOfClusters);
    let lights = [];
    var clusterCount = clusterUIDList.length;
    var currentClusterIndex = 0;
    if (clusterCount % 2 === 1) {
      for (let k = 0; k < clusterCount - 1; k++) {
        let uID = clusterUIDList[currentClusterIndex];
        lights.push(
          <div className="col-md-6" key={currentClusterIndex}>
            <CardContainer
              nav
              type="bodyheader"
              title={clusterList[uID].Name}
              UID={uID}
              hexOrientation={clusterList[uID].Orientation}
            >
              <HexLayout layout={clusterList[uID].Layout} />
            </CardContainer>
          </div>
        );
        currentClusterIndex++;
      }
      let uID = clusterUIDList[currentClusterIndex];
      lights.push(
        <div className="col-md-12" key={currentClusterIndex}>
          <CardContainer
            nav
            type="bodyheader"
            title={clusterList[uID].Name}
            UID={uID}
            hexOrientation={clusterList[uID].Orientation}
          >
            <HexLayout layout={clusterList[uID].Layout} />
          </CardContainer>
        </div>
      );
      currentClusterIndex++;
    } else {
      for (let k = 0; k < clusterCount; k++) {
        let uID = clusterUIDList[currentClusterIndex];
        lights.push(
          <div className="col-md-6" key={currentClusterIndex}>
            <CardContainer
              nav
              type="bodyheader"
              title={clusterList[uID].Name}
              UID={uID}
              hexOrientation={clusterList[uID].Orientation}
            >
              <HexLayout layout={clusterList[uID].Layout} />
            </CardContainer>
          </div>
        );
        currentClusterIndex++;
      }
    }
    return lights;
  }

  onChangeQuickControl(newValue, controlIndex) {
    this.setState(state => {
      const quickControlValues = state.quickControlValues.map(
        (value, index) => {
          if (controlIndex === index) {
            return newValue;
          } else {
            return value;
          }
        }
      );
      return {
        quickControlValues
      };
    });
  }

  renderQuickControls() {
    let clusterList = Object.keys(this.state.listOfClusters);
    return clusterList.map(
      function(clusterUID, index) {
        return (
          <QuickSlider
            key={index}
            title={this.state.listOfClusters[clusterUID].Name}
            value={this.state.quickControlValues[index]}
            onChange={e => this.onChangeQuickControl(e.target.value, index)}
          />
        );
      }.bind(this)
    );
  }

  renderLoading() {
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

  renderClusters() {
    const { userName } = this.state;

    return (
      <MainContainer>
        <SlimContainer>
          <Alert
            color="success"
            isOpen={this.state.alertVisble}
            toggle={this.onAlertDismiss}
          >
            Welcome to the future of lighting, <b>{userName}</b>. Are you
            excited!?! No. (┛◉Д◉)┛彡┻━┻
          </Alert>
          <div className="row">
            <div className="col-md-8">
              <CardContainer type="card" title="Clusters">
                <div className="row">{this.renderLightsBox()}</div>
              </CardContainer>
            </div>
            <div className="col-md-4">
              <CardContainer type="card" title="Quick Control">
                {this.renderQuickControls()}
              </CardContainer>
            </div>
          </div>
        </SlimContainer>
      </MainContainer>
    );
  }

  render() {
    return this.state.isLayoutLoaded
      ? this.renderClusters()
      : this.renderLoading();
  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Dashboard);

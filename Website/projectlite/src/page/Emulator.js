import React, { Component } from "react";
import { withFirebase } from "../components/Firebase";

import {
  RootContainer,
  Container,
  MainContainer
} from "../components/Container";
import CardContainer from "../components/Container/CardContainer";

class Hexagon extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <g
        transform={
          "translate(400,400)" + (this.props.pointy ? "\nrotate(-30,0,0)" : "")
        }
      >
        <g
          transform={
            "translate(" +
            (173.2 + 0.686 * this.props.margin) *
              Number(this.props.name.split(",")[0]) +
            ", " +
            (-(200 + this.props.margin) *
              Number(this.props.name.split(",")[1]) -
              (100 + 0.5 * this.props.margin) *
                Number(this.props.name.split(",")[0])) +
            ")\nrotate(30,0,0)"
          }
        >
          <polygon
            points="-100,-57.7 -100,57.7 0,0"
            fill={"#" + this.props.effect[this.props.name]["A"]}
          />
          <polygon
            points="-100,57.7 0,115.47 0,0"
            fill={"#" + this.props.effect[this.props.name]["B"]}
          />
          <polygon
            points="0,115.47 100,57.7 0,0"
            fill={"#" + this.props.effect[this.props.name]["C"]}
          />
          <polygon
            points="100,57.7 100,-57.7 0,0"
            fill={"#" + this.props.effect[this.props.name]["D"]}
          />
          <polygon
            points="100,-57.7 0,-115.47 0,0"
            fill={"#" + this.props.effect[this.props.name]["E"]}
          />
          <polygon
            points="0,-115.47 -100,-57.7 0,0"
            fill={"#" + this.props.effect[this.props.name]["F"]}
          />
        </g>
      </g>
    );
  }

  static defaultProps = {
    location: [0, 0],
    margin: 5,
    color: ["#000000", "#0000ff", "#00ff00", "#ff0000", "#00ffff", "#ffff00"],
    pointy: true
  };
}

class HexaCanvas extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let i = 0;
    let hexas = Object.keys(this.props.layout).map(d => (
      <Hexagon
        key={d}
        name={d}
        effect={this.props.effect}
        pointy={this.props.pointy}
      />
    ));

    return (
      <svg width={800} height={800}>
        <rect x={0} y={0} height={800} width={800} fill="grey" />
        {hexas}
      </svg>
    );
  }
}

class Emulator extends Component {
  constructor(props) {
    super(props);
    this.firebase = this.props.firebase;
    this.state = {
      effect: {},
      layout: {},
      ready: false,
      pointy: false
    };
    this.firebase.SetClusterRef("7PDovc4elK", o => {
      let use = o.Effect["0,0,0"];
      this.setState({
        effect: o.Effect,
        layout: o.Layout,
        ready: true
      });
    });
  }

  render() {
    if (this.firebase.getCurrentUser())
      this.user = this.firebase.getCurrentUser();
    return (
      <MainContainer>
        <CardContainer type="bodyheader">
          This is the emulator container <br />
          {this.firebase.getCurrentUser() ? this.user.email : "Not Signed In"}
          <br />
          {this.state.ready ? (
            <HexaCanvas
              layout={this.state.layout}
              effect={this.state.effect}
              pointy={this.state.pointy}
            />
          ) : (
            <span> Not ready </span>
          )}
          <input
            type="checkbox"
            onChange={x => {
              console.log(x.target.checked);
              this.setState({
                pointy: x.target.checked
              });
            }}
          />
        </CardContainer>
      </MainContainer>
    );
  }
}

export default withFirebase(Emulator);

import React, { Component } from "react";
import CardContainer from "./Container/CardContainer";
import styled from "styled-components";
import {
  HexGrid,
  Layout,
  Hexagon,
  Text,
  Pattern,
  Path,
  Hex
} from "react-hexgrid";

const Border = styled.div`
  svg g {
    fill: #fff;
    stroke: #666;
    stroke-width: 1px;
  }
  hr {
    width: 90%;
    border-top: 1px solid rgba(0, 0, 0, 0.15);
  }
  h3 {
  text-align:center;
  }
`;
var i = 0;

class LightsBox extends Component {
  constructor(props) {
    super(props);
    this.hexagonList = this.hexagonList.bind(this);
  }

  hexagonList() {
    let layoutClusterData = Object.keys(this.props.clusterData.Layout);
    return layoutClusterData.map(function(location, index) {
      let coordinate = location.split(",").map(Number);
      return (
        <Hexagon
          key={index}
          q={coordinate[0]}
          s={coordinate[1]}
          r={coordinate[2]}
        >
        </Hexagon>
      );
    });
  }

  /*
  redblobgame cube coord to react-hexgrid
  x, y, z (redblobgame)  =  x, z, y (react-hexgrid)

  workaround: pass and format props in cube form so
  pass in order of q={} s={} r={}
  */
  render() {
    const { title, clusterData } = this.props;

    return (
    <Border>
      <CardContainer type="bodyheader" title={title}>
        <hr />
          <HexGrid width={"100%"} height={"100%"}>
            <Layout
              size={{ x: 10, y: 10 }}
              flat={true}
              spacing={1.1}
              origin={{ x: 0, y: 0 }}
            >
              {this.hexagonList()}
            </Layout>
          </HexGrid>
      </CardContainer>
    </Border>
    );
  }
}

export default LightsBox;

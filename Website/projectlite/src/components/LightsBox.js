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
  background-color: yellow;
`;

class LightsBox extends Component {
  constructor(props) {
    super(props);
    this.hexagonList = this.hexagonList.bind(this);
  }

  hexagonList() {
    let layoutClusterData = Object.keys(this.props.clusterData.Layout);
    return layoutClusterData.map(function(location, index) {
      let coordinate = location.split(",").map(Number);
      console.log(coordinate);
      return (
        <Hexagon
          key={index}
          q={coordinate[0]}
          s={coordinate[1]}
          r={coordinate[2]}
          
        >
          <Text>{location}</Text>
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
      <CardContainer type="bodyheader" title={title}>
        <Border>
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
        </Border>
      </CardContainer>
    );
  }
}

export default LightsBox;

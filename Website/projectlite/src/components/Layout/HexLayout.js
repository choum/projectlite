import React, { Component } from "react";
import { HexGrid, Layout, Hexagon } from "react-hexgrid";

class HexLayout extends Component {
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
        />
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
    return (
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
    );
  }
}

export default HexLayout;

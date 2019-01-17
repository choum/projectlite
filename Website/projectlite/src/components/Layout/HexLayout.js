import React from "react";
import { HexGrid, Layout, Hexagon } from "react-hexgrid";

const getHexagonMap = (clusterLayout, selectable, onClick) => {
  let hexCoordinates = Object.keys(clusterLayout);
  return hexCoordinates.map(function(location, index) {
    let coordinate = location.split(",").map(Number);
    if (selectable) {
      return (
        <a onClick={() => onClick(location)} key={index}>
          <Hexagon q={coordinate[0]} s={coordinate[1]} r={coordinate[2]} />
        </a>
      );
    } else {
      return (
        <Hexagon
          key={index}
          q={coordinate[0]}
          s={coordinate[1]}
          r={coordinate[2]}
        />
      );
    }
  });
};

/*
  redblobgame cube coord to react-hexgrid
  x, y, z (redblobgame)  =  x, z, y (react-hexgrid)

  workaround: pass and format props in cube form so
  pass in order of q={} s={} r={}
*/
const HexLayout = ({ layout, selectable, onClick, onClear }) => {
  if (onClear) {
    return (
      <a>
        <HexGrid width={"100%"} height={"100%"}>
          <Layout
            size={{ x: 10, y: 10 }}
            flat={true}
            spacing={1.1}
            origin={{ x: 0, y: 0 }}
          >
            {getHexagonMap(layout, selectable, onClick)}
          </Layout>
        </HexGrid>
      </a>
    );
  } else {
    return (
      <HexGrid width={"100%"} height={"100%"}>
        <Layout
          size={{ x: 10, y: 10 }}
          flat={true}
          spacing={1.1}
          origin={{ x: 0, y: 0 }}
        >
          {getHexagonMap(layout, selectable, onClick)}
        </Layout>
      </HexGrid>
    );
  }
};

export default HexLayout;

import React from "react";
import { HexGrid, Layout } from "react-hexgrid";

/*
  redblobgame cube coord to react-hexgrid
  x, y, z (redblobgame)  =  x, z, y (react-hexgrid)

  workaround: pass and format props in cube form so
  pass in order of q={} s={} r={}
  */
const HexLayout = props => (
  <HexGrid width={"100%"} height={"100%"}>
    <Layout
      size={{ x: 10, y: 10 }}
      flat={true}
      spacing={1.1}
      origin={{ x: 0, y: 0 }}
    >
      {props.children}
    </Layout>
  </HexGrid>
);

export default HexLayout;

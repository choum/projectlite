import React from "react";
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

const LightsBox = ({title, clusterData}) => (
  <CardContainer type="bodyheader" title={title}>
    <Border>
      {console.log(clusterData)}
      <HexGrid width={"100%"} height={"100%"}>
        <Layout
          size={{ x: 10, y: 10 }}
          flat={true}
          spacing={1.1}
          origin={{ x: 0, y: 0 }}
        >
          <Hexagon q={0} r={0} s={0} />
        </Layout>
      </HexGrid>
    </Border>
  </CardContainer>
);

export default LightsBox;

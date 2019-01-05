import React from "react";
import CardContainer from "./Container/CardContainer";
import styled from "styled-components";
import { HexGrid, Layout, Hexagon, Text, Pattern, Path, Hex } from 'react-hexgrid';

const LightsBox = ()=> (
    <CardContainer type="bodyheader" title="Cluster Name">
    <HexGrid width={'100%'} height={'auto'} viewBox="-57 -50 100 100">
      <Layout size={{ x: 10, y: 10 }} flat={true} spacing={1.1} origin={{ x: 0, y: 0 }}>
        <Hexagon q={0} r={0} s={0} />
                  {/* Using pattern (defined below) to fill the hexagon */}
                  <Hexagon q={0} r={1} s={-1} />
                  <Hexagon q={1} r={-1} s={1}>
                  </Hexagon>
                  <Hexagon q={1} r={0} s={-1}>
                  </Hexagon>
                  {/* Pattern and text */}
                  <Hexagon q={-1} r={0} s={1} />
                  <Hexagon q={-2} r={0} s={1} />
                  <Hexagon q={-2} r={1} s={1} />
      </Layout>
    </HexGrid>
  </CardContainer>
);

export default LightsBox;

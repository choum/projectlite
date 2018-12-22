import React from "react";
import CardContainer from "./Container/CardContainer";
import styled from "styled-components";
const Hexagon = styled.div `
&:before {
    content: " ";
    width: 0; height: 0;
    border-bottom: 30px solid #6C6;
    border-left: 52px solid transparent;
    border-right: 52px solid transparent;
    position: absolute;
    top: -30px;
}

    margin-top: 30px;
    width: 104px;
    height: 60px;
    background-color: #6C6;
    position: relative;

&:after {
    content: "";
    width: 0;
    position: absolute;
    bottom: -30px;
    border-top: 30px solid #6C6;
    border-left: 52px solid transparent;
    border-right: 52px solid transparent;
}

`;
const ClearHexagon = styled.div`
  position: relative;
  width: 50px;
  height: 28.87px;
  background-color: #ffffff;
  margin: 14.43px 0;
  border-left: solid 2px #fdfdfd;
  border-right: solid 2px #fdfdfd;

&:before,
&:after {
  content: "";
  position: absolute;
  z-index: 1;
  width: 35.36px;
  height: 35.36px;
  -webkit-transform: scaleY(0.5774) rotate(-45deg);
  -ms-transform: scaleY(0.5774) rotate(-45deg);
  transform: scaleY(0.5774) rotate(-45deg);
  background-color: inherit;
  left: 5.3223px;
}

&:before {
  top: -17.6777px;
  border-top: solid 2.8284px #fdfdfd;
  border-right: solid 2.8284px #fdfdfd;
}

&:after {
  bottom: -17.6777px;
  border-bottom: solid 2.8284px #fdfdfd;
  border-left: solid 2.8284px #fdfdfd;
}

`;
const Row = styled.div`
  padding: 0 !important;
  display: flex;
  justify-content: center;
  align-items: center;
`
const NextRow = styled.div`
  margin-left: px;
  display: flex;
  justify-content: center;
  align-items: center;
`
const LightsBox = ()=> (
    <CardContainer type="bodyheader" title="Cluster Name">
        <Row>
          <Hexagon />
          <Hexagon />
        </Row>
      <Row>
        <Hexagon />
        <Hexagon />
        <Hexagon />
      </Row>
  </CardContainer>
);

export default LightsBox;

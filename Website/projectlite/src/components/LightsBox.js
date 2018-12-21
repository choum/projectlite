import React from "react";
import CardContainer from "./Container/CardContainer";
import styled from "styled-components";
const Hexagon = styled.div `
  position: relative;
  width: 100px;
  height: 57.74px;
  background-color: #f1f0e4;
  margin: 28.87px 0;
  border-left: solid 2px #646464;
  border-right: solid 2px #646464;

  &:before,
  &:after {
    content: "";
    position: absolute;
    z-index: 1;
    width: 70.71px;
    height: 70.71px;
    -webkit-transform: scaleY(0.5774) rotate(-45deg);
    -ms-transform: scaleY(0.5774) rotate(-45deg);
    transform: scaleY(0.5774) rotate(-45deg);
    background-color: inherit;
    left: 12.6447px;
  }
  &:before {
    top: -35.3553px;
    border-top: solid 2.8284px #646464;
    border-right: solid 2.8284px #646464;
  }

  &:after {
    bottom: -35.3553px;
    border-bottom: solid 2.8284px #646464;
    border-left: solid 2.8284px #646464;
  }
`;
const ClearHexagon = styled.div`
  position: relative;
  width: 100px;
  height: 57.74px;
  background-color: #fff;
  margin: 28.87px 0;
  border-left: solid 1px #fff;
  border-right: solid 1px #fff;

  &:before,
  &:after {
    content: "";
    position: absolute;
    z-index: 1;
    width: 70.71px;
    height: 70.71px;
    -webkit-transform: scaleY(0.5774) rotate(-45deg);
    -ms-transform: scaleY(0.5774) rotate(-45deg);
    transform: scaleY(0.5774) rotate(-45deg);
    background-color: inherit;
    left: 12.6447px;
  }

  &:before {
    top: -35.3553px;
    border-top: solid 1.8284px #fff;
    border-right: solid 1.8284px #fff;
  }

  &:after {
    bottom: -35.3553px;
    border-bottom: solid 1.8284px #fff;
    border-left: solid 1.8284px #fff;
  }
`;
const Row = styled.div`
  padding: 0 !important;
  display: flex;
  justify-content: center;
  align-items: center;
`
const NextRow = styled.div`
  margin-top: -30px;
  display: flex;
  justify-content: center;
  align-items: center;
`
const LightsBox = ()=> (
  <CardContainer type="card" title="Clusters">
    <CardContainer type="bodyheader" title="Cluster Name">
        <Row>
          <Hexagon />
          <Hexagon />
        </Row>
      <NextRow>
        <ClearHexagon />
        <ClearHexagon />
        <Hexagon />
        <Hexagon />
        <Hexagon />
      </NextRow>
  </CardContainer>
  </CardContainer>
);

export default LightsBox;

import React from "react";
import styled from "styled-components";

const Features = styled.div `
  background-color: #504b43;
  width: 100%;
  padding: 10px;

  margin-bottom: 60px;
  bottom: 0;
`

const FeaturesContainer = ({ children }) => {
  return <Features>{children}</Features>;
};

export default FeaturesContainer;

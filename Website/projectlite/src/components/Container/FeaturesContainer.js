import React from "react";
import styled from "styled-components";

const Features = styled.div `
  background-color: #504b43;
  width: 100%;
`

const FeaturesContainer = ({ children }) => {
  return <Features>{children}</Features>;
};

export default FeaturesContainer;

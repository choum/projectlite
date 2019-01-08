import React from "react";
import styled from "styled-components";

const Root = styled.div `
  padding-bottom: 60px;
  height: 100%;
`

const RootContainer = ({ children }) => {
  return <Root className="container">{children}</Root>;
};

export default RootContainer;

import React from "react";
import styled from "styled-components";

const Slim = styled.div `
  padding-left: 3%;
  padding-right: 3%;
  padding-top: 2%;
`

const SlimContainer = ({ children }) => {
  return <Slim>{children}</Slim>;
};

export default SlimContainer;

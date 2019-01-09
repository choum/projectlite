import React from "react";
import styled from "styled-components";

const Slim = styled.div `
  padding-left: 4%;
  padding-right: 4%;
  padding-top: 5%;
`

const SlimContainer = ({ children }) => {
  return <Slim>{children}</Slim>;
};

export default SlimContainer;

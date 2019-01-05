import React from "react";
import styled from "styled-components";

const Slim = styled.div `
  margin-left: 4%;
  margin-right: 4%;
  margin-top: 5%;
`

const SlimContainer = ({ children }) => {
  return <Slim>{children}</Slim>;
};

export default SlimContainer;

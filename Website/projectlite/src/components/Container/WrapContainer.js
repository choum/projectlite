import React from "react";
import styled from "styled-components";

const Wrap = styled.div`
position: relative;
height: auto;
min-height: 100%;
`

const WrapContainer = ({ children }) => {
  return <Wrap>{children}</Wrap>;
};

export default WrapContainer;

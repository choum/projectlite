import React from "react";
import styled from "styled-components";

const Main = styled.div `
  overflow: hidden;
  padding-bottom: 60px;
  margin-top: 73px;
  height: 100%;
`

const MainContainer = ({ children }) => {
  return <Main>{children}</Main>;
};

export default MainContainer;

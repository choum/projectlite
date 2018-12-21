import React from "react";

import { DefaultContainer } from "../Container";
import styled from "styled-components";

const Foot = styled.footer`
position: relative;
margin-top: -60px;
/*width: 100%;*/
height: 60px;
clear: both;

background-color: #282828;
padding: 20px;
color: #fff;
`

const Footer = () => {
  return (
    <Foot className="footer">
      <DefaultContainer>
        <span>This is a footer.</span>
      </DefaultContainer>
    </Foot>
  );
};

export default Footer;

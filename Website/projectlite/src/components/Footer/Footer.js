import React from "react";

import { DefaultContainer } from "../Container";
import styled from "styled-components";

const Foot = styled.footer`
position: fixed;
margin-top: -60px;
/*width: 100%;*/
height: 60px;
clear: both;
bottom: 0px;
width: 100%;
background-color: #282828;
padding: 20px;
color: #fff;
text-align: right;
`

const Footer = () => {
  return (
    <Foot className="footer">
      <DefaultContainer>
        <span>Project Lite 	&copy; 2019</span>
      </DefaultContainer>
    </Foot>
  );
};

export default Footer;

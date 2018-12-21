import React from "react";
import { Button } from "reactstrap";
import styled from "styled-components";

const StyledButton = styled.button`
background-color: #000;
color: white;
`

const DefaultButton = props => {
  return <StyledButton className="btn">{props.text}</StyledButton>;
};

export default DefaultButton;

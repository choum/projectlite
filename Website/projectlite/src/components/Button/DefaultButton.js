import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  :hover {
    color: white;
  }

  background-color: #000;
  color: white;
  width: 100%;
`;

const DefaultButton = props => {
  return (
    <StyledButton {...props} className="btn">
      {props.text}
    </StyledButton>
  );
};

export default DefaultButton;

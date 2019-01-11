import React from "react";
import styled from "styled-components";

const DefaultButton = styled.button`
  padding: 10px 20px;
  font-weight: 500;
  color: #333 !important;
  background-color: #fff;
  border: 1px solid #fff;

  &:hover,
  &:focus {
    color: #333;
    background-color: #fff;
    border: 1px solid #000;
  }
`;

const LinkButton = props => {
  return <DefaultButton className="btn">{props.text}</DefaultButton>;
};

export default LinkButton;

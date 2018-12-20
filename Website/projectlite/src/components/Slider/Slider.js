import React from "react";
import styled from "styled-components";

const Input = styled.input`
  width: 90% !important;
`;

const Slider = ({ value, onChange }) => (
  <Input
    type="range"
    className="slider"
    min="1"
    max="100"
    value={value}
    onChange={onChange}
  />
);

export default Slider;

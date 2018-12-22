import React from "react";
import styled from "styled-components";

const InputDiv = styled.div`
  .wrapper {
    border: 2px solid black;
    border-radius: 50px;
    padding: 25px;
  }

  .slider {
    -webkit-appearance: none; /* Override default CSS styles */
    appearance: none;
    width: 100%; /* Full-width */
    height: 5px; /* Specified height */
    border-radius: 5px;
    background: #d3d3d3;
    outline: none; /* Remove outline */
    opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
    -webkit-transition: 0.2s; /* 0.2 seconds transition on hover */
    transition: opacity 0.2s;
  }

  .slider:hover {
    opacity: 1; /* Fully shown on mouse-over */
  }

  .slider::-webkit-slider-thumb {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    width: 15px; /* Set a specific slider handle width */
    height: 15px; /* Slider handle height */
    border-radius: 25px;
    background: #4caf50; /* Green background */
    cursor: pointer; /* Cursor on hover */
  }

  .slider::-moz-range-thumb {
    width: 25px; /* Set a specific slider handle width */
    height: 25px; /* Slider handle height */
    border-radius: 25px;
    background: #4caf50; /* Green background */
    cursor: pointer; /* Cursor on hover */
  }
`;

const Slider = ({ value, onChange }) => (
  <InputDiv>
    <input
      type="range"
      className="slider"
      step="1"
      min="0"
      max="255"
      value={value}
      onChange={onChange}
    />
  </InputDiv>
);

export default Slider;

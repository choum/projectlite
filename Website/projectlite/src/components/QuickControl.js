import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

import CardContainer from "../components/Container/CardContainer";
import Slider from "../components/Slider/Slider";

const Box = styled.div`
  display: flex;
  align-items: center;

  .slider {
    margin-left: 20px;
    margin-right: 20px;
    width: 100%;
  }
`;

const offColor = "#CDCDCD";
const onColor = "#41FE58";

const QuickControl = ({ value, onChange }) => (
    <CardContainer type="bodyheader" title="Room">
      <Box>
        <FontAwesomeIcon
          icon={faLightbulb}
          size="3x"
          color={value < 1 ? offColor : onColor}
        />
        <div className="slider">
          <Slider className="slider" value={value} onChange={onChange} />
        </div>
      </Box>
    </CardContainer>
);

export default QuickControl;

// handleChange = e => {
//   this.setState({ value: e.target.value }, () => {
//     console.log(this.state.value);
//   });
// };

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

import { CardContainer } from "../Container";
import { Slider } from "./index";

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
const onColor = "#F3DE8A";

const QuickSlider = ({ value, onChange, title }) => (
  <CardContainer type="bodyheader" title={title}>
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

export default QuickSlider;

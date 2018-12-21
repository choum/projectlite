import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

import { DefaultContainer } from "../components/Container";
import { H1 } from "../components/Text";
import Switch from "../components/Switch/Switch";
import Slider from "../components/Slider/Slider";

const Inline = styled.div`
  display: inline;
  svg {
    display: inline-block;
  }
`;

class ViewComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 50
    };
  }

  handleChange = e => this.setState({ value: e.target.value });

  render() {
    return (
      <DefaultContainer>
        <BorderCard>
          <h1>Bathroom</h1>
          <Inline>
            <FontAwesomeIcon icon={faLightbulb} size="lg" />
            <Slider value={this.state.value} onChange={this.handleChange} />
          </Inline>
          <Switch />
      </DefaultContainer>
    );
  }
}

export default ViewComponent;

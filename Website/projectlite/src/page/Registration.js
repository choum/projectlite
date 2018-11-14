import React, { Component } from "react";

import {
  MainContainer,
  FormContainer,
  CardContainer
} from "../components/Container";
import { SingleLineTextBox } from "../components/TextBox";

class Registration extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MainContainer>
        <FormContainer>
          <CardContainer type="registration" title="registration">
            <SingleLineTextBox
              label="Email"
              type="text"
              name="RegistrationEmail"
              placeholder="Email"
            />
          </CardContainer>
        </FormContainer>
      </MainContainer>
    );
  }
}

export default Registration;

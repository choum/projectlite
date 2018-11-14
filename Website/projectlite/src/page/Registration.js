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
              label="Username"
              type="text"
              name="RegistrationUsername"
              placeholder="Username"
            />
            <SingleLineTextBox
              label="Email"
              type="text"
              name="RegistrationEmail"
              placeholder="Email"
            />
            <SingleLineTextBox
              label="Password"
              type="password"
              name="RegistrationPassword"
              placeholder="Password"
            />
            <SingleLineTextBox
              label="Confirm Password"
              type="password"
              name="RegistrationConfirmPassword"
              placeholder="Confirm Password"
            />
          </CardContainer>
        </FormContainer>
      </MainContainer>
    );
  }
}

export default Registration;

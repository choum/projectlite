import React, { Component } from "react";

import {
  MainContainer,
  FormContainer
} from "../components/Container";
import { SingleLineTextBox } from "../components/TextBox";
import { DefaultButton } from "../components/Button";
import CardContainer from "../components/Container/CardContainer"

class Registration extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MainContainer>
        <FormContainer>
          <CardContainer type="registration" title="Registration">
            <SingleLineTextBox
              label="Username"
              id="username"
              type="text"
              name="RegistrationUsername"
              placeholder="Username"
              required="true"
            />
            <SingleLineTextBox
              label="Email"
              id="email"
              type="text"
              name="RegistrationEmail"
              placeholder="Email"
            />
            <SingleLineTextBox
              label="Password"
              id="password"
              type="password"
              name="RegistrationPassword"
              placeholder="Password"
            />
            <SingleLineTextBox
              label="Confirm Password"
              id="cpassword"
              type="password"
              name="RegistrationConfirmPassword"
              placeholder="Confirm Password"
            />
            <DefaultButton text="Submit" />
          </CardContainer>
        </FormContainer>
      </MainContainer>
    );
  }
}

export default Registration;

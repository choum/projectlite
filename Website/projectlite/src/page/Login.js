import React, { Component } from "react";

import {
  MainContainer,
  FormContainer
} from "../components/Container";
import { SingleLineTextBox } from "../components/TextBox";
import { DefaultButton } from "../components/Button";
import CardContainer from "../components/Container/CardContainer"

class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MainContainer>
        <FormContainer>
          <CardContainer type="bodyheader" title="Login">
            <form>
            <SingleLineTextBox
              label="Username"
              id="username"
              type="text"
              name="LoginUsername"
              placeholder="Username"
              required="true"
            />
            <SingleLineTextBox
              label="Password"
              id="password"
              type="password"
              name="LoginPassword"
              placeholder="Password"
            />
            <DefaultButton className="btn" text="Submit" />
            </form>
          </CardContainer>
        </FormContainer>
      </MainContainer>
    );
  }
}

export default Login;

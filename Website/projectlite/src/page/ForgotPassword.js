import React, { Component } from "react";
import styled from "styled-components";

import {
  MainContainer,
  FormContainer,
  CardContainer
} from "../components/Container";
import { SingleLineTextBox } from "../components/TextBox";
import { DefaultButton } from "../components/Button";

import { withFirebase } from "../components/Firebase";

const Error = styled.p`
  color: red;
`;

const INITIAL_STATE = {
  email: "",
  error: null
};

class ForgotPasswordFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
    this.firebase = this.props.firebase;
  }

  onSubmit = event => {
    const { email } = this.state;

    this.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => this.setState({ error: error.message }));

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, error } = this.state;

    return (
      <React.Fragment>
        {error && (
          <Error>Ahhh something went wrong!! Litepods releasing...</Error>
        )}
        <SingleLineTextBox
          label="Email"
          type="text"
          name="email"
          placeholder="Email"
          value={email}
          required={true}
          onChange={this.onChange}
        />
        <DefaultButton text="Reset My Password" onClick={this.onSubmit} />
      </React.Fragment>
    );
  }
}

const ForgotPassword = () => (
  <MainContainer>
    <FormContainer>
      <CardContainer type="bodyheader" title="Account Recovery">
        <ForgotPasswordForm />
      </CardContainer>
    </FormContainer>
  </MainContainer>
);

const ForgotPasswordForm = withFirebase(ForgotPasswordFormBase);
export default ForgotPassword;

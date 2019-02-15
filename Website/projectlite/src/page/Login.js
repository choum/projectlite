import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";

import { MainContainer, FormContainer } from "../components/Container";
import { SingleLineTextBox } from "../components/TextBox";
import { DefaultButton } from "../components/Button";
import CardContainer from "../components/Container/CardContainer";

import { withFirebase } from "../components/Firebase";

const Error = styled.div`
  color: red;
`;

const INITIAL_STATE = {
  email: "",
  pass: "",
  error: null,
  toDashboard: false
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
    this.validate = this.validate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.firebase = this.props.firebase;
  }

  validate = () => {};

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    const { email, pass } = this.state;

    this.firebase
      .doSignInWithEmailAndPassword(email, pass)
      .then(() => {
        this.setState({ ...INITIAL_STATE, toDashboard: true });
      })
      .catch(error => this.setState({ error: error.message }));

    event.preventDefault();
  };

  render() {
    const { email, pass, error, toDashboard } = this.state;

    if (toDashboard === true) {
      return <Redirect to="/dashboard" />;
    }

    return (
      <MainContainer>
        <FormContainer>
          <CardContainer type="bodyheader" title="Login">
            <SingleLineTextBox
              label="Email"
              id="email"
              type="text"
              name="email"
              placeholder="Email"
              value={email}
              required={true}
              onChange={this.onChange}
            />
            <SingleLineTextBox
              label="Password"
              id="password"
              type="password"
              name="pass"
              placeholder="Password"
              value={pass}
              required={true}
              onChange={this.onChange}
            />
            <DefaultButton
              className="btn"
              text="Submit"
              onClick={this.onSubmit}
            />
            {error && <Error>{error}</Error>}
          </CardContainer>
        </FormContainer>
      </MainContainer>
    );
  }
}

export default withFirebase(Login);

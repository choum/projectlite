import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import style from "styled-components";

import { MainContainer, FormContainer } from "../components/Container";
import { SingleLineTextBox } from "../components/TextBox";
import { DefaultButton } from "../components/Button";
import CardContainer from "../components/Container/CardContainer";

import { withFirebase } from "../components/Firebase";

const Error = style.div`
  color: red;
`;

const defaultState = {
  email: "",
  pass: "",
  confirmPass: "",
  error: null,
  toDashboard: false
};

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = { ...defaultState };
    this.onSubmit = this.onSubmit.bind(this);
    this.firebase = this.props.firebase;
  }

  onSubmit = event => {
    const { email, pass } = this.state;
    this.firebase
      .doCreateUserWithEmailAndPassword(email, pass)
      .then(authUser => {
        this.setState({ ...defaultState, toDashboard: true });
      })
      .catch(error => {
        this.setState({ error: error.message });
      });
    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, pass, confirmPass, error, toDashboard } = this.state;

    if (toDashboard) {
      return <Redirect to="/dashboard" />;
    }

    return (
      <MainContainer>
        <FormContainer>
          <CardContainer type="bodyheader" title="Sign Up">
            <SingleLineTextBox
              label="Email"
              type="text"
              name="email"
              placeholder="Email"
              value={email}
              required={true}
              onChange={this.onChange}
            />
            <SingleLineTextBox
              label="Password"
              type="password"
              name="pass"
              placeholder="Password"
              value={pass}
              required={true}
              onChange={this.onChange}
            />
            <SingleLineTextBox
              label="Confirm Password"
              type="password"
              name="confirmPass"
              placeholder="Confirm Password"
              value={confirmPass}
              required={true}
              onChange={this.onChange}
            />
            <DefaultButton
              className="btn"
              text="Submit"
              onClick={this.onSubmit}
            />
            {error !== null && <Error>{error}</Error>}
          </CardContainer>
        </FormContainer>
      </MainContainer>
    );
  }
}

export default withFirebase(SignUp);
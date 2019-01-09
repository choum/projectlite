import React, { Component } from "react";

import { MainContainer, FormContainer } from "../components/Container";
import { SingleLineTextBox } from "../components/TextBox";
import { DefaultButton } from "../components/Button";
import CardContainer from "../components/Container/CardContainer";
import { Redirect } from "react-router-dom";
import { withFirebase } from "../components/Firebase";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      pass: "",
      enabled: true,
      toDashboard: false
    };
    this.validate = this.validate.bind(this);
    this.doSubmit = this.doSubmit.bind(this);
    this.firebase = this.props.firebase;
  }

  validate = () => {};

  doSubmit = () => {
    this.setState({ enabled: false });
    this.firebase.doSignIn(this.state.email, this.state.pass);
    this.setState({ toDashboard: true });
  };

  render() {
    if (this.state.toDashboard === true) {
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
              name="LoginEmail"
              placeholder="Username"
              required="true"
              onChange={e => {
                this.setState({ email: e.target.value });
              }}
            />
            <SingleLineTextBox
              label="Password"
              id="password"
              type="password"
              name="LoginPassword"
              placeholder="Password"
              required="true"
              onChange={e => {
                this.setState({ pass: e.target.value });
              }}
            />
            <DefaultButton
              className="btn"
              text="Submit"
              onClick={this.doSubmit}
            />
          </CardContainer>
        </FormContainer>
      </MainContainer>
    );
  }
}

export default withFirebase(Login);

import React, { Component } from "react";

import { MainContainer, FormContainer } from "../components/Container";
import { SingleLineTextBox } from "../components/TextBox";
import { DefaultButton } from "../components/Button";
import CardContainer from "../components/Container/CardContainer";
import { Redirect } from "react-router-dom";

import { withFirebase } from "../components/Firebase";

class RegistrationBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      pass1: "",
      pass2: "",
      enabled: true,
      toDashboard: false
    };
    this.validate = this.validate.bind(this);
    this.doSubmit = this.doSubmit.bind(this);
    this.firebase = this.props.firebase;
  }

  validate = () => {};

  doSubmit = () => {
    if (this.state.pass1 !== this.state.pass2) return;
    this.setState({ enabled: false });
    this.firebase.doCrateUser(this.state.email, this.state.pass1);
    this.setState({ toDashboard: true });
  };

  render() {
    if (this.state.toDashboard === true) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <MainContainer>
        <FormContainer>
          <CardContainer type="bodyheader" title="Registration">
            <SingleLineTextBox
              label="Email"
              id="email"
              type="text"
              name="RegistrationEmail"
              placeholder="Email"
              disabled={!this.state.enabled}
              //value={this.state.email}
              onChange={e => {
                this.setState({ email: e.target.value });
              }}
            />
            <SingleLineTextBox
              label="Password"
              id="password"
              type="password"
              name="RegistrationPassword"
              placeholder="Password"
              disabled={!this.state.enabled}
              //value={this.state.pass1}
              onChange={e => {
                this.setState({ pass1: e.target.value });
              }}
            />
            <SingleLineTextBox
              label="Confirm Password"
              id="cpassword"
              type="password"
              name="RegistrationConfirmPassword"
              placeholder="Confirm Password"
              disabled={!this.state.enabled}
              //value={this.state.pass2}
              onChange={e => {
                this.setState({ pass2: e.target.value });
              }}
            />
            {this.state.pass1 !== this.state.pass2
              ? "Passwords do not match"
              : ""}
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

const Registration = withFirebase(RegistrationBase);

export default Registration;

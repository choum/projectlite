import React, { Component } from "react";

import {
  MainContainer,
  CardContainer,
  SlimContainer,
  FormContainer
} from "../components/Container";
import { SingleLineTextBox } from "../components/TextBox";
import { DefaultButton } from "../components/Button";
import { Billing } from "../components/Form";
import styled from "styled-components";

class Settings extends Component {
  render() {
    return (
      <MainContainer>
        <SlimContainer>
          <CardContainer type="card" title="Credentials">
            <form>
              <label>Change Email</label>
              <input type="text" className="form-control" />
              <br />
              <button className="btn btn-light">Change Email</button>
            </form>
            <hr />
            <label>Reset Password</label>
            <br />
            <button className="btn btn-light">Reset Password</button>
          </CardContainer>
          <CardContainer type="card" title="Subscriptions">
            <label>Subscribe to Our Emails</label>
            <input type="checkbox" />
          </CardContainer>
          <CardContainer type="card" title="Billing Information">
            <button className="btn btn-light">Add Billing Information</button>
            <Billing />
          </CardContainer>
        </SlimContainer>
      </MainContainer>
    );
  }
}
export default Settings;

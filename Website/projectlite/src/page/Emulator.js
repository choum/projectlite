import React, { Component } from "react";
import { withFirebase } from "../components/Firebase";

import {
  RootContainer,
  Container,
  MainContainer
} from "../components/Container";
import CardContainer from "../components/Container/CardContainer";

class Emulator extends Component {
  constructor(props) {
    super(props);
    this.firebase = this.props.firebase;
  }

  render() {
    if (this.firebase.getCurrentUser())
      this.user = this.firebase.getCurrentUser();
    return (
      <MainContainer>
        <CardContainer type="bodyheader">
          This is the emulator container <br />
          {this.firebase.getCurrentUser() ? this.user.email : "Not Signed In"}
        </CardContainer>
      </MainContainer>
    );
  }
}

export default withFirebase(Emulator);

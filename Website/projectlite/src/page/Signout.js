import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { MainContainer } from "../components/Container";
import { withFirebase } from "../components/Firebase";

class Signout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectReady: false
    };
    this.firebase = this.props.firebase;

    this.doSO = this.doSO.bind(this);

    setTimeout(this.doSO, 100);
  }

  doSO = () => {
    this.firebase.doSignOut();
    this.setState({ redirectReady: true });
  };

  render() {
    if (this.state.redirectReady === true) return <Redirect to="/home" />;
    return (
      <MainContainer>
        Signing out... <br />
        Redirecting..
      </MainContainer>
    );
  }
}

export default withFirebase(Signout);

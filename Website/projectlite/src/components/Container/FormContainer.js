import React, { Component } from "react";
import styled from "styled-components";

const Form = styled.div`
  display: table;
  margin: 0 auto;
  padding-top: 10%;
  padding-bottom: 10%;
`

class FormContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Form>{this.props.children}</Form>;
  }
}

export default FormContainer;

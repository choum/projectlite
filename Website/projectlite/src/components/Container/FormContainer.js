import React, { Component } from "react";
import styled from "styled-components";

const Form = styled.div`
  display: table;
  margin: 0 auto;
  padding-top: 5%;
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

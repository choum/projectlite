import React from "react";
import styled from "styled-components";

const Form = styled.div`
  display: table;
  margin: 0 auto;
  padding-top: 5%;
`;

const FormContainer = props => <Form>{props.children}</Form>;

export default FormContainer;

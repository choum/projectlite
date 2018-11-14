import React from "react";
import { FormGroup, Label, Input } from "reactstrap";

const SingleLineTextBox = props => {
  return (
    <FormGroup>
      <Label for={props.label}>{props.label}</Label>
      <Input
        type={props.type}
        name={props.name}
        id={props.label}
        placeholder={props.placeholder}
      />
    </FormGroup>
  );
};

export default SingleLineTextBox;

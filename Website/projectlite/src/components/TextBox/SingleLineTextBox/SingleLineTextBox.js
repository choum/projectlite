import React from "react";
import { FormGroup, Label, Input } from "reactstrap";

const SingleLineTextBox = props => {
  return (
    <FormGroup>
      <Label for={props.id}>{props.label}</Label>
      <Input
        type={props.type}
        name={props.name}
        id={props.id}
        placeholder={props.placeholder}
        required={props.required}
      />
    </FormGroup>
  );
};

export default SingleLineTextBox;

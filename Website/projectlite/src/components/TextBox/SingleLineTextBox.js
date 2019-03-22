import React from "react";
import { FormGroup, Label, Input } from "reactstrap";

const SingleLineTextBox = props => {
  return (
    <FormGroup>
      <Label for={props.id}>{props.label}</Label>
      <Input {...props} />
    </FormGroup>
  );
};

export default SingleLineTextBox;

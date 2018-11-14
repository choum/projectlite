import React, { Component } from "react";

import "./stylesFormContainer.css";

class FormContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="a">{this.props.children}</div>;
  }
}

export default FormContainer;

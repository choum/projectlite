import React, { Component } from "react";

import { DefaultContainer } from "../components/Container";
import { BorderCard } from "../components/Card";
import { H1 } from "../components/Text";

class ViewComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <DefaultContainer>
        <BorderCard>
          <H1 ClusterName="Bathroom" />
        </BorderCard>
      </DefaultContainer>
    );
  }
}

export default ViewComponent;

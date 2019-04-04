

import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  .radio-custom + .radio-custom-label:before {
      border-radius: 50%;
  }

  .radio-custom:checked + .radio-custom-label:before {
      content: "\f00c";
      font-family: 'FontAwesome';
      color: #bbb;
  }
`

const CheckBox = props => (

)

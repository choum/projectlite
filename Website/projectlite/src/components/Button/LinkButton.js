import React from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";


const DefaultButton = styled.a`
padding: 10px 20px;
font-weight: bold;
color: #333 !important;
text-shadow: none;
background-color: #fff;
border: 1px solid #fff;

&:hover,
&:focus {
  color: #333;
  text-shadow: none;
  background-color: #fff;
  border: 1px solid #fff;
}
`



const LinkButton = (props) => {
    return (
        <DefaultButton>{props.text}</DefaultButton>
    );
};

export default LinkButton;

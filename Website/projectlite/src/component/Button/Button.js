import React from 'react';
import PropTypes from 'prop-types';

import './stylesButton.css';

const LinkButton = (props) => {
    return (
        <a href={props.href} class='btn btn-lg btn-default'>{props.text}</a>
    );
};

export default LinkButton;
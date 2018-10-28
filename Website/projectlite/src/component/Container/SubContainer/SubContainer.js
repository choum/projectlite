import React from 'react';
import PropTypes from 'prop-types';

import './stylesSubContainer.css';

const SubContainer = (props) => {
    return (
        <div className="inner cover">
            <h1 className="cover-heading">{props.h1Text}</h1>
            <p className="lead">{props.pText}</p>
            <p className="lead">
                <a href="features.html" className="btn btn-lg btn-default">{props.btnText}</a>
            </p>
        </div>
    );
};

SubContainer.propTypes = {
    h1Text: PropTypes.string,
    pText: PropTypes.string,
    btnText: PropTypes.string
};

export default SubContainer;


import React, { PropTypes } from 'react';

import './stylesSubContainer.css';

const SubContainer = (props) => {
    return (
        <div class="inner cover">
            <h1 class="cover-heading">{props.h1Text}</h1>
            <p class="lead">{props.pText}</p>
            <p class="lead">
                <a href="features.html" class="btn btn-lg btn-default">{props.btnText}</a>
            </p>
        </div>
    );
};

SubContainer.propTypes = {
    h1Text: PropTypes.string,
    pText: PropTypes.string,
    btnText: PropTypes.string
}

export default SubContainer;


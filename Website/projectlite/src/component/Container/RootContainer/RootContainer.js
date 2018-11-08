import React from 'react';

import './stylesRootContainer.css';

const RootContainer = ({ children }) => {
    return (
        <div className="rootContainer">
            {children}
        </div>
    );
}

export default RootContainer;
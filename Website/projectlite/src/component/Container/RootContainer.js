import React from 'react';

const RootContainer = ({ children }) => {
    return (
        <div className="container">
            {children}
        </div>
    );
};

export default RootContainer;
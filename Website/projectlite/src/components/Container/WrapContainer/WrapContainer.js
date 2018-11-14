import React from "react";

import "./stylesWrapContainer.css";

const WrapContainer = ({ children }) => {
  return <div className="wrap">{children}</div>;
};

export default WrapContainer;

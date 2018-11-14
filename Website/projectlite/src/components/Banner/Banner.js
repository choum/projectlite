import React from "react";
import PropTypes from "prop-types";

import "./stylesBanner.css";

import { LinkButton } from "../Button";

const Banner = props => {
  return (
    <div className="wrapper">
      <div className="wrapper-inner">
        <div className="content">
          <h1 className="cover-heading">{props.h1Text}</h1>
          <p className="lead">{props.pText}</p>
          <p className="lead">
            <LinkButton href="features.html" text={props.btnText} />
          </p>
        </div>
      </div>
    </div>
  );
};

Banner.propTypes = {
  h1Text: PropTypes.string,
  pText: PropTypes.string,
  btnText: PropTypes.string
};

export default Banner;

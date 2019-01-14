import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { LinkButton } from "../Button";
import { DefaultContainer } from "../Container";

const SiteWrapper = styled.div`
  display: table;
  height: 600px;
  width: 100%;

.site-wrapper-inner {
  vertical-align: middle;
  display: table-cell;
}

.content {
  text-align: center;
  color: #fff;
  /*margin-top: 200px;*/
  padding: 0 20px;
}

`

const Banner = props => {
  return (
    <SiteWrapper>
      <div className="site-wrapper-inner">
        <DefaultContainer>
          <div className="content">
            <h1 className="cover-heading">{props.h1Text}</h1>
            <p className="lead">{props.pText}</p>
            <p className="lead">
              <LinkButton className="btn" href="features.html" text={props.btnText} />
            </p>
          </div>
        </DefaultContainer>
      </div>
    </SiteWrapper>
  );
};

Banner.propTypes = {
  h1Text: PropTypes.string,
  pText: PropTypes.string,
  btnText: PropTypes.string
};

export default Banner;

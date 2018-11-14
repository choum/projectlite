import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card, CardHeader, CardBody, CardText } from "reactstrap";

import "./stylesCardContainer.css";
import { DefaultContainer } from "../index";

class CardContainer extends Component {
  constructor(props) {
    super(props);
  }

  renderFeatures() {
    const { title, content } = this.props;
    var cards = [];

    for (var i = 0; i < title.length; i++) {
      cards.push(
        <div className="col-md-4" key={i}>
          <Card>
            <CardHeader>{title[i]}</CardHeader>
            <CardBody>
              <CardText>{content[i]}</CardText>
            </CardBody>
          </Card>
        </div>
      );
    }

    return <div className="row">{cards}</div>;
  }

  renderAbout() {
    const { title, content } = this.props;
    return (
      <main>
        <DefaultContainer>
          <Card>
            <CardBody>
              <h3 className="card-title">{title}</h3>
              <hr />
              <CardText>{content}</CardText>
            </CardBody>
          </Card>
        </DefaultContainer>
      </main>
    );
  }

  renderRegistration() {
    const { title } = this.props;
    return (
      <Card>
        <CardBody>
          <h3 className="card-title">{title}</h3>
          <form method="post">{this.props.children}</form>
        </CardBody>
      </Card>
    );
  }

  render() {
    let type = this.props.type;
    let cardDisplay;

    if (type === "features") {
      cardDisplay = this.renderFeatures();
    } else if (type === "about") {
      cardDisplay = this.renderAbout();
    } else if (type === "registration") {
      cardDisplay = this.renderRegistration();
    } else {
      cardDisplay = <p>error</p>;
    }

    return <React.Fragment>{cardDisplay}</React.Fragment>;
  }
}

export default CardContainer;

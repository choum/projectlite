import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card, CardHeader, CardBody, CardText } from "reactstrap";

import "./stylesCardContainer.css";
import { DefaultContainer } from "../index";

class CardContainer extends Component {
  constructor(props) {
    super(props);
  }

  renderCards() {
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

    return (
      <div className="wrapper2">
        <div className="row">{cards}</div>
      </div>
    );
  }

  renderCard() {
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

  render() {
    return (
      <React.Fragment>
        {this.props.title.length > 1 ? this.renderCards() : this.renderCard()}
      </React.Fragment>
    );
  }
}

export default CardContainer;

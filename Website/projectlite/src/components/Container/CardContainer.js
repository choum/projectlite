import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Card, CardHeader, CardBody, CardText } from "reactstrap";
import { DefaultContainer } from "./index";

const Title = styled.h3 `
  text-align:center;
`
const CardWrapper = styled.div `
  hr {
    width: 70%;
  }

  main {
    margin-top: 10%;
  }

  .row {
    padding: 40px;
    margin-right: 0px;
    margin-left: 0px;
  }
  margin: 30px;
  .card {
    padding-bottom: 30px;
  }

`
class CardContainer extends Component {
  constructor(props) {
    super(props);
  }
  renderCardWithHeader() {
    const { title, content } = this.props;
    return (
      <CardWrapper>
      <Card>
        <CardHeader><Title>{title}</Title></CardHeader>
        <CardBody>
          <CardText>{this.props.children}</CardText>
        </CardBody>
      </Card>
      </CardWrapper>
    );
  }
  renderCardBodyHeader() {
    const { title, content } = this.props;
    return (
      <CardWrapper>
      <Card>
        <CardBody>
        <h3 className="card-title">{title}</h3>
          <CardText>{this.props.children}</CardText>
        </CardBody>
      </Card>
      </CardWrapper>
    );
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
    } else if (type === "bodyheader") {
      cardDisplay = this.renderCardBodyHeader();
    } else if (type === "card") {
      cardDisplay = this.renderCardWithHeader();
    } else {
      cardDisplay = <p>error</p>;
    }

    return <React.Fragment>{cardDisplay}</React.Fragment>;
  }
}

export default CardContainer;

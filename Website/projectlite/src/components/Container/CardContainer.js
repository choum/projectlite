import React, { Component } from "react";
import styled from "styled-components";
import { Card, CardHeader, CardBody, CardText } from "reactstrap";
import { DefaultContainer } from "./index";
import { NavLink } from "react-router-dom";

const Title = styled.h3`
  text-align: center;
`;

const CardWrapper = styled.div`
  margin: 10px;
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
`;

const ClusterBorder = styled.div`
  svg g {
    fill: #fff;
    stroke: #666;
    stroke-width: 1px;
  }
  svg {
    transform: ${props =>
      props.hexOrientation ? "scale(0.80)" : "rotate(30deg) scale(0.80)"};
  }
  .card-body:hover svg g * {
    stroke: #4caf50;
    stroke-width: 1px;
  }
  hr {
    width: 90%;
    border-top: 1px solid rgba(0, 0, 0, 0.15);
  }
  h3 {
    text-align: center;
  }
  a {
    color: black;
  }
  a:hover {
    text-decoration: none;
  }
`;

class CardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hexOrientation: false
    };
  }
  renderCardWithHeader() {
    const { title } = this.props;

    return (
      <CardWrapper>
        <Card>
          <CardHeader>
            <Title>{title}</Title>
          </CardHeader>
          <CardBody>{this.props.children}</CardBody>
        </Card>
      </CardWrapper>
    );
  }

  renderCardBodyHeader() {
    const { title } = this.props;
    return (
      <CardWrapper className={this.props.className}>
        <Card>
          <CardBody>
            <h3 className="card-title">{title}</h3>
            {this.props.children}
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
            <CardBody>{content[i]}</CardBody>
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

  renderClusterCard() {
    const { title, UID, hexOrientation } = this.props;
    console.log(hexOrientation);
    return (
      <ClusterBorder hexOrientation={hexOrientation}>
        <NavLink to={"/hexagon-profile/" + UID}>
          <CardWrapper>
            <Card>
              <CardBody>
                <h3 className="card-title">{title}</h3>
                <hr />
                {this.props.children}
              </CardBody>
            </Card>
          </CardWrapper>
        </NavLink>
      </ClusterBorder>
    );
  }

  render() {
    let type = this.props.type;
    let cardDisplay;

    if (type === "cluster") {
      cardDisplay = this.renderClusterCard();
    } else if (type === "features") {
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

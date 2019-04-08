import React, { Component } from "react";
import styled from "styled-components";
import { Card, CardHeader, CardBody } from "reactstrap";
import { NavLink } from "react-router-dom";

const Title = styled.h3`
  text-align: center;
`;

const LargeTitle = styled.h2`
  text-align: center;
  font-size: 27pt;
`;

const CardWrapper = styled.div`
  margin: 10px;
  main {
    margin-top: 10%;
  }
  .row {
    padding: 40px;
    margin-right: 0px;
    margin-left: 0px;
  }
  svg g {
    fill: #fff;
    stroke: #666;
    stroke-width: 1px;
  }
  svg {
    transform: ${props =>
      props.hexOrientation ? "rotate(30deg) scale(0.80)" : "scale(0.80)"};
    transition: 1s;
    -webkit-transition: 1s;
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
  .noBorder>* {
    border: none;
  }
`;
const CardWrapperBorder = styled(CardWrapper)`
  .card {
    border: none;
  }
  .card-header {
    border-bottom: none;
    background-color: transparent;
  }
  svg {
    transform: scale(.7) translate(0%, -25%);
  }
`

const ClickableWrapper = styled(CardWrapper)`
  .card-body:hover svg g * {
    stroke: #4caf50;
    stroke-width: 1px;
  }
`;

class CardContainer extends Component {
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
  renderCardNoBorder() {
    const { title } = this.props;
    return (
      <CardWrapperBorder>
        <Card>
          <CardHeader>
            <LargeTitle>{title}</LargeTitle>
          </CardHeader>
          <CardBody>{this.props.children}</CardBody>
        </Card>
      </CardWrapperBorder>
    );
  }

  renderCardBodyHeader() {
    const { title, UID, hexOrientation, nav } = this.props;
    return (
      <CardWrapper hexOrientation={hexOrientation}>
        {nav && (
          <NavLink to={"/hexagon-profile/" + UID}>
            <ClickableWrapper>
              <Card>
                <CardBody>
                  <h3 className="card-title">{title}</h3>
                  <hr />
                  {this.props.children}
                </CardBody>
              </Card>
            </ClickableWrapper>
          </NavLink>
        )}
        {!nav && (
          <CardWrapper>
            <Card style={{border:"none"}}>
              <CardBody>
                <h3 className="card-title">{title}</h3>
                {this.props.children}
              </CardBody>
            </Card>
          </CardWrapper>
        )}
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

  render() {
    let type = this.props.type;
    let display;

    switch (type) {
      case "noBorder":
        display = this.renderCardBodyHeader();
        break;
      case "features":
        display = this.renderFeatures();
        break;
      case "bodyheader":
        display = this.renderCardBodyHeader();
        break;
      case "card":
        display = this.renderCardWithHeader();
        break;
      default:
        display = <p>error</p>;
    }

    return display;
  }
}

export default CardContainer;

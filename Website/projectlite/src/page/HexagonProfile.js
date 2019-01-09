import React, { Component } from "react";
import styled from "styled-components";
import {
  MainContainer,
  SlimContainer
} from "../components/Container";
import { SideNav, Nav } from "react-sidenav";

const Navigation = styled.div`
  background-color: #282828;
  color: white;
`
class HexagonProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
    render() {
      return (
      <MainContainer>
        <div className="row">
          <div className="col-md-3">
          <Navigation>
            <SideNav defaultSelectedPath="1">
                <Nav id="1">Item 1</Nav>
                <Nav id="2">Item 2</Nav>
                <Nav id="3">Item 3</Nav>
            </SideNav>
          </Navigation>
          </div>
          <div className="col-md-7">
          </div>
        </div>
      </MainContainer>
    );
    }
  }
  export default HexagonProfile;

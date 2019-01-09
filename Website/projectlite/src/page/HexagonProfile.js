import React, { Component } from "react";
import styled from "styled-components";
import {
  MainContainer,
  SlimContainer
} from "../components/Container";
import CardContainer from "../components/Container/CardContainer";
import { SideNav, Nav } from "react-sidenav";
import Toggle from "react-toggle-component"
import "react-toggle-component/styles.css"

const Navigation = styled.div`
  background-color: #282828;
  color: white;
  height: 93vh;
  width: 100%;
`
const MenuType = styled.h4`
  margin-top: 10px;
  text-align:center;
`
const ItemType = styled.h5`
  margin-top: 5px;
  font-weight: normal;
`
const Divider = styled.hr`
  border-color: white;
`
class HexagonProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  category() {
    if (this.state.checked) {

    } else {

    }
  }

  renderSimple() {
    return (
    <div className="row">
        <div className="col-md-2">
        <Navigation>
          <SideNav defaultSelectedPath="1">
            <SlimContainer>
              <MenuType>Simple Customization</MenuType>
              <Divider/>
              <div className="effect-block">
              <ItemType>Effect:</ItemType>
              <select className="form-control form-control-sm">
                <option>Static Color</option>
                <option>Wave</option>
              </select>
              </div>
              <Divider/>
              <div className="orientation-block">
                <ItemType>Orientation:</ItemType>
                <label>
                  <input type="radio" name="options" id="option1" autocomplete="off" checked />Flat
                </label>
                <br/>
                <label>
                  <input type="radio" name="options" id="option2" autocomplete="off" checked />Pointy
                </label>
              </div>
              <Divider/>
            </SlimContainer>
          </SideNav>
        </Navigation>
        </div>
        {this.renderCluster()}
        <div className="col-md-2">
          <Navigation>
            <SideNav>
            </SideNav>
          </Navigation>
        </div>
      </div>
    );
  }

  renderAdvanced() {
    return (
      <div className="row">
          <div className="col-md-2">
          <Navigation>
            <SideNav defaultSelectedPath="1">
              <SlimContainer>
                <MenuType>Advanced Customization</MenuType>
                <Divider/>
                <div className="effect-block">
                <ItemType>Effect:</ItemType>
                <select className="form-control form-control-sm">
                  <option>Static Color</option>
                  <option>Wave</option>
                </select>
                </div>
                <Divider/>
                <div className="orientation-block">
                  <ItemType>Orientation:</ItemType>
                  <label>
                    <input type="radio" name="options" id="option1" autocomplete="off" checked />Flat
                  </label>
                  <br/>
                  <label>
                    <input type="radio" name="options" id="option2" autocomplete="off" checked />Pointy
                  </label>
                </div>
                <Divider/>
              </SlimContainer>
            </SideNav>
          </Navigation>
          </div>
          {this.renderCluster()}
          <div className="col-md-2">
            <Navigation>
              <SideNav>
              </SideNav>
            </Navigation>
          </div>
        </div>
    );
  }

  renderCluster() {
    return (
      <div className="col-md-8">
        <SlimContainer>
          <CardContainer type="bodyheader" title="Cluster: (uid here)">
            <Toggle label="Simple" labelRight="Advanced" style={{float: 'right'}} checked={this.state.checked} onToggle={value => this.setState({checked:value})}/>
          </CardContainer>
        </SlimContainer>
      </div>
    );
  }
    render() {
      return (
      <MainContainer>
        {this.state.checked === true ? this.renderAdvanced() : this.renderSimple()}
      </MainContainer>
    );
    }
  }
  export default HexagonProfile;

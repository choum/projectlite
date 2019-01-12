import React, { Component } from "react";
import styled from "styled-components";
import { SideNav } from "react-sidenav";
import Toggle from "react-toggle-component";
import "react-toggle-component/styles.css";

import {
  MainContainer,
  SlimContainer,
  CardContainer
} from "../components/Container";
import { HexLayout } from "../components/Layout";

import { withFirebase } from "../components/Firebase";

const Navigation = styled.div`
  background-color: #282828;
  color: white;
  height: 100vh;
  width: 100%;
`;
const MenuType = styled.h4`
  margin-top: 10px;
  text-align: center;
`;
const ItemType = styled.h5`
  margin-top: 5px;
  font-weight: normal;
`;
const Divider = styled.hr`
  border-color: white;
`;

class HexagonProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleAdvance: false,
      toggleOrientation: false,
      clusterData: {},
      isClusterLoaded: false
    };

    this.firebase = this.props.firebase;
    this.dbref = this.getData();
  }

  componentWillUnmount() {
    this.dbref.off();
  }

  getData() {
    return this.firebase.getCluster(this.props.match.params.id, val => {
      this.setState({
        clusterData: val,
        isClusterLoaded: true
      });
    });
  }

  renderClusterLayout() {
    return null;
  }

  renderSideNav() {
    console.log(this.state.clusterData);
    return (
      <MainContainer>
        <div className="row">
          <div className="col-md-2">
            <Navigation>
              <SideNav defaultSelectedPath="1">
                <SlimContainer>
                  {this.state.toggleAdvance ? (
                    <MenuType>Advanced Customization</MenuType>
                  ) : (
                    <MenuType>Simple Customization</MenuType>
                  )}
                  <Divider />
                  <div className="effect-block">
                    <ItemType>Effect:</ItemType>
                    <select
                      value={this.state.selectValue}
                      onChange={e => {
                        this.setState({
                          selectValue: e.target.value
                        });
                      }}
                      className="form-control"
                    >
                      <option>Static Color</option>
                      <option>Wave</option>
                    </select>
                  </div>
                  <Divider />
                  <div className="orientation-block">
                    <ItemType>Orientation:</ItemType>
                    <label>
                      <input
                        checked={!this.state.toggleOrientation}
                        onChange={e =>
                          this.setState({
                            toggleOrientation: !this.state.toggleOrientation
                          })
                        }
                        type="radio"
                        name="options"
                        id="option1"
                        value="Flat"
                      />
                      Flat
                    </label>
                    <br />
                    <label>
                      <input
                        checked={this.state.toggleOrientation}
                        onChange={e =>
                          this.setState({
                            toggleOrientation: !this.state.toggleOrientation
                          })
                        }
                        type="radio"
                        name="options"
                        id="option2"
                        value="Pointy"
                      />
                      Pointy
                    </label>
                  </div>
                  <Divider />
                  {this.state.selectValue === "Wave" &&
                    this.state.toggleAdvance === true && (
                      <div className="pick-block">
                        <ItemType>Pick Order</ItemType>
                        <button className="btn btn-light" value="Pick">
                          Pick
                        </button>
                      </div>
                    )}
                </SlimContainer>
              </SideNav>
            </Navigation>
          </div>
          {this.renderCluster()}
          <div className="col-md-2">
            <Navigation>
              <SideNav />
            </Navigation>
          </div>
        </div>
      </MainContainer>
    );
  }

  renderCluster() {
    return (
      <div className="col-md-8">
        <SlimContainer>
          <CardContainer type="bodyheader" title={this.state.clusterData.Name}>
            {this.renderClusterLayout()}
            <Toggle
              label="Simple"
              labelRight="Advanced"
              style={{ float: "right" }}
              checked={this.state.toggleAdvance}
              onToggle={value => this.setState({ toggleAdvance: value })}
            />
          </CardContainer>
        </SlimContainer>
      </div>
    );
  }

  renderLoading() {
    return (
      <MainContainer>
        <SlimContainer>
          <CardContainer type="card" title="Clusters">
            Loading...
          </CardContainer>
        </SlimContainer>
      </MainContainer>
    );
  }

  render() {
    return this.state.isClusterLoaded
      ? this.renderSideNav()
      : this.renderLoading();
  }
}
export default withFirebase(HexagonProfile);

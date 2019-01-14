import React, { Component } from "react";
import styled from "styled-components";
import { MainContainer, SlimContainer } from "../components/Container";
import CardContainer from "../components/Container/CardContainer";
import { SideNav, Nav } from "react-sidenav";
import Toggle from "react-toggle-component";
import "react-toggle-component/styles.css";

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
const Wrapper = styled.span`
  border-top: 3px solid white;
  border-bottom: 3px solid white;
`;
class HexagonProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleAdvance: false,
      toggleOrientation: false,
      hexOrientation: "flat",
    };
  }

  renderTitle() {
    if (this.state.toggleAdvance === true) {
      return <MenuType>Advanced Customization</MenuType>;
    } else {
      return <MenuType>Simple Customization</MenuType>;
    }
  }

  renderSideNav() {
    return (
      <div className="row">
        <div className="col-md-2">
          <Navigation>
            <SideNav defaultSelectedPath="1">
              <SlimContainer>
                {this.renderTitle()}
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
    );
  }

  renderCluster() {
    return (
      <div className="col-md-8">
        <SlimContainer>
          <CardContainer type="bodyheader" title="Cluster: (uid here)">
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

  render() {
    return <MainContainer>{this.renderSideNav()}</MainContainer>;
  }
}
export default HexagonProfile;

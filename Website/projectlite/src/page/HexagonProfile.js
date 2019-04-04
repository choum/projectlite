import React, { Component } from "react";
import styled from "styled-components";
import { SideNav } from "react-sidenav";
import Toggle from "react-toggle-component";
import "react-toggle-component/styles.css";
import { ChromePicker } from "react-color";

import {
  MainContainer,
  SlimContainer,
  CardContainer
} from "../components/Container";
import { HexLayout } from "../components/Layout";
import { Slider } from "../components/Slider";
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
const Wrap = styled.p`
  word-wrap: break-word;
`;

class HexagonProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleAdvance: false,
      clusterData: {},
      isClusterLoaded: false,
      hexOrientation: false,
      isSelectedListList: {},
      selectedEffect: "",
      hexColor: "",
      rgbColor: "" ,
      speed: ""
    };

    this.firebase = this.props.firebase;
    this.handleChange = this.handleChange.bind(this);
    this.updateSpeed = this.updateSpeed.bind(this);
  }

  componentDidMount() {
    this.dbref = this.getData();
  }

  componentWillUnmount() {
    this.dbref.off();
  }

  toggleOrientation() {
    this.setState(
      {
        hexOrientation: !this.state.hexOrientation
      },
      () =>
        this.firebase.setClusterOrientation(
          this.props.match.params.id,
          this.state.hexOrientation
        )
    );
  }

  getData() {
    return this.firebase.getCluster(this.props.match.params.id, val => {
      let isSelectedList = {};
      let clusterKeys = Object.keys(val.Layout);

      for (let i = 0; i < clusterKeys.length; i++) {
        isSelectedList[clusterKeys[i]] = false;
      }

      this.setState({
        clusterData: val,
        hexOrientation: val.Orientation,
        isClusterLoaded: true,
        isSelectedList: isSelectedList
      });
    });
  }

  onPress() {
    console.log("button pressed");
  }

  renderSideNav() {
    let {
      toggleAdvance,
      selectedEffect,
      hexOrientation,
      isSelectedList
    } = this.state;
    return (
      <MainContainer>
        <div className="row">
          <div className="col-md-2">
            <Navigation>
              <SideNav defaultSelectedPath="1">
                <SlimContainer>
                  {toggleAdvance ? (
                    <MenuType>Advanced Customization</MenuType>
                  ) : (
                    <MenuType>Simple Customization</MenuType>
                  )}
                  <Divider />
                  <div className="effect-block">
                    <ItemType>Effect:</ItemType>
                    <select
                      value={selectedEffect}
                      onChange={e => {
                        this.setState({
                          selectedEffect: e.target.value
                        });
                      }}
                      className="form-control"
                    >
                      <option />
                      <option>Static Color</option>
                      <option>Wave</option>
                    </select>
                  </div>
                  <Divider />
                  <div className="orientation-block">
                    <ItemType>Orientation:</ItemType>
                    <label>
                      <input
                        checked={!hexOrientation}
                        onChange={e => this.toggleOrientation()}
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
                        checked={hexOrientation}
                        onChange={e => this.toggleOrientation()}
                        type="radio"
                        name="options"
                        id="option2"
                        value="Pointy"
                      />
                      Pointy
                    </label>
                  </div>
                  <Divider />
                  {selectedEffect === "Wave" && toggleAdvance && (
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
              <SideNav>
                <SlimContainer>
                  <Wrap>{JSON.stringify(isSelectedList)}</Wrap>
                  <button onClick={e => this.onClickClear()}>Clear</button>
                  {this.renderRightSideNav()}
                </SlimContainer>
              </SideNav>
            </Navigation>
          </div>
        </div>
      </MainContainer>
    );
  }

  pickColor() {
    let { isSelectedList, hexColor, rgbColor } = this.state;
    //get ids
    let clusterKeys = Object.keys(isSelectedList);

    //go through all ids
    for (let i = 0; i < clusterKeys.length; i++) {
      // store html
      let element = document.getElementById(clusterKeys[i]);
      //look through the html snippet for a polygon element
      let polygon = element.querySelector("polygon");

      if (isSelectedList[clusterKeys[i]] === true) {
        polygon.style.stroke = "green";
      } else {
        //not selected then default color
        polygon.style.stroke = "#666";
      }

      if (isSelectedList[clusterKeys[i]] === true && !(hexColor === "")) {
        if (!(rgbColor === polygon.style.fill)) {
          console.log("fire");
          polygon.style.fill = hexColor;
        }

        // only covers case of static
        this.updateDatabaseClusterEffect(clusterKeys[i], hexColor);
      }
    }
  }

  updateDatabaseClusterEffect(coordinate, hexColor) {
    const { selectedEffect } = this.state;

    if (selectedEffect === "Static Color") {
      for (let i = 1; i <= 30; i++) {
        this.firebase.setClusterEffect(
          this.props.match.params.id,
          coordinate,
          i,
          hexColor
        );
      }
    }
  }

  handleChange(color, event) {
    let rgbColor =
      "rgb(" + color.rgb.r + ", " + color.rgb.g + ", " + color.rgb.b + ")";
    this.setState({
      hexColor: color.hex,
      rgbColor: rgbColor
    });
    this.pickColor();
  }

  updateSpeed(value) {
    this.setState({
      speed: value
    });
  }

  renderRightSideNav() {
    let allFalse = Object.keys(this.state.isSelectedList).every(
      k => !this.state.isSelectedList[k]
    );
    let isAdvanced = this.state.toggleAdvance;
    if (isAdvanced) {
      return (
        <SlimContainer>
          {this.state.selectedEffect === "Static Color" && (
            <div>
              <p>
                <h5>Bucket</h5>- Fills the selected hexagon with color
              </p>
              <ChromePicker
                color={this.state.hexColor}
                onChangeComplete={this.handleChange}
              />
              <Divider />

            </div>
          )}

          {this.state.selectedEffect === "Wave" &&
            <div>
              <Divider />
              <h5>Properties</h5>
              <label>Speed</label>
              <input className="form-control" type="number" name="speed" min="0" max="50" value={this.state.speed} onChange={e => this.updateSpeed(e.target.value)}/>
              <Slider min="0" max="50" value={this.state.speed} onChange={e => this.updateSpeed(e.target.value)}/>
            </div>
          }
          <hr />
        </SlimContainer>
      );
    } else if (!isAdvanced) {
      return (
        <SlimContainer>
          {this.state.selectedEffect === "Static Color" && (
            <div>
              <p>
                <h5>Bucket</h5>- Fills the selected hexagon with color
              </p>
              <ChromePicker
                color={this.state.hexColor}
                onChangeComplete={this.handleChange}
              />
            </div>
          )}
        </SlimContainer>
      );
    } else {
      return "";
    }
  }

  onClickSelect(hexID) {
    console.log(hexID);
    let isSelectedList = this.state.isSelectedList;
    isSelectedList[hexID] = !isSelectedList[hexID];
    this.pickColor();
    this.setState({ isSelectedList: isSelectedList });
  }

  onClickClear() {
    let clusterKeys = Object.keys(this.state.isSelectedList);
    let isSelectedList = {};
    for (let i = 0; i < clusterKeys.length; i++) {
      isSelectedList[clusterKeys[i]] = false;
    }
    this.setState({ isSelectedList: isSelectedList });
  }

  renderCluster() {
    return (
      <div className="col-md-8">
        <SlimContainer>
          <CardContainer
            type="bodyheader"
            title={this.state.clusterData.Name}
            hexOrientation={this.state.hexOrientation}
          >
            <HexLayout
              layout={this.state.clusterData.Layout}
              selectable
              onClick={hexID => this.onClickSelect(hexID)}
              selected={this.state.isSelectedList}
            />
            <Toggle
              label="Simple"
              labelRight="Advanced"
              style={{ float: "right" }}
              checked={this.state.toggleAdvance}
              onToggle={value =>
                this.setState({ toggleAdvance: !this.state.toggleAdvance })
              }
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

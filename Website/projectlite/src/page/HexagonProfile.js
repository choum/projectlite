import React, { Component } from "react";
import styled from "styled-components";
import { SideNav } from "react-sidenav";
import Toggle from "react-toggle-component";
import "react-toggle-component/styles.css";
import { ChromePicker } from "react-color";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import {
  MainContainer,
  SlimContainer,
  CardContainer
} from "../components/Container";
import { Knob } from "../components/Knob";
import { HexLayout } from "../components/Layout";
import { Slider } from "../components/Slider";
import { ColorBarStatic, ColorBarPicker } from "../components/ColorBar";

import { withFirebase } from "../components/Firebase";

const Navigation = styled.div`
  background-color: #282828;
  color: white;
  height: 100vh;
  width: 100%;
`;

const Divider = styled.hr`
  border-color: white;
`;
const ColumnColor = styled.div`
  background-color: #282828;
`;

class HexagonProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleAdvance: false,
      toggleSplit: false,
      clusterData: {},
      isClusterLoaded: false,
      hexOrientation: false,
      selectedEffect: "Wave",
      hexColor: "",
      rgbColor: "",
      speed: "0",
      width: "100",
      popup: false,
      colorBarPickerLefts: [
        {
          left: "30%"
        },
        {
          left: "50%"
        },
        {
          left: "65%"
        },
        {
          left: "85%"
        }
      ],
      colorBarPickerBackgroundColors: [
        "#42f483",
        "#F55FFF",
        "#FFFE3E",
        "#32E5F2"
      ]
    };

    this.firebase = this.props.firebase;
    this.handleChange = this.handleChange.bind(this);
    this.updateSpeed = this.updateSpeed.bind(this);
  }

  componentDidMount() {
    this.dbref = this.getData();
    this.dbColorPickerRef = this.getColorPickerData();
  }

  componentWillUnmount() {
    this.dbref.off();
    this.dbColorPickerRef.off();
  }

  getColorPickerData() {
    return this.firebase.getClusterEffectSortByKey(
      this.props.match.params.id,
      val => {
        let left = this.pickerLeftObjCreator(val);
        let backColor = this.pickerBackgroundColorArrCreator(val);
        this.setState({
          colorBarPickerLefts: left,
          colorBarPickerBackgroundColors: backColor
        });
      }
    );
  }

  pickerLeftObjCreator(obj) {
    let arr = [];
    for (let i in obj.Left) {
      arr.push({ left: obj.Left[i] + "%" });
    }
    return arr;
  }

  pickerBackgroundColorArrCreator(obj) {
    let arr = [];
    for (let i in obj.Hex) {
      arr.push(obj.Hex[i]);
    }
    return arr;
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

  handleChange(color, event) {
    let rgbColor =
      "rgb(" + color.rgb.r + ", " + color.rgb.g + ", " + color.rgb.b + ")";
    this.setState({
      hexColor: color.hex,
      rgbColor: rgbColor
    });
    this.pickColor();
  }

  onClickSelect(hexID) {
    if (this.state.selectedEffect === "Static Color") {
      let isSelectedList = this.state.isSelectedList;
      isSelectedList[hexID] = !isSelectedList[hexID];
      this.setState({ isSelectedList: isSelectedList });
      this.pickColor();
    }
  }

  onClickClear() {
    let clusterKeys = Object.keys(this.state.isSelectedList);
    let isSelectedList = {};
    for (let i = 0; i < clusterKeys.length; i++) {
      isSelectedList[clusterKeys[i]] = false;
    }
    this.setState({ isSelectedList: isSelectedList }, () => {
      this.pickColor();
    });
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

  onLeftChangeColorBarPicker = (index, val) => {
    const { colorBarPickerLefts } = this.state;
    let newColorBarPickerLefts = colorBarPickerLefts.splice(0);
    newColorBarPickerLefts[index] = { left: val + "%" };
    this.setState(
      {
        colorBarPickerBackgroundColors: newColorBarPickerLefts
      },
      this.firebase.leftChangeWaveEffect(this.props.match.params.id, index, val)
    );
  };

  onAddPointerColorBarPicker = (index, left, hex) => {
    const { colorBarPickerLefts, colorBarPickerBackgroundColors } = this.state;
    let newColorBarPickerLefts = colorBarPickerLefts.splice(0);
    let newcolorBarPickerBackgroundColors = colorBarPickerBackgroundColors.splice(
      0
    );
    newColorBarPickerLefts[index] = { left: left + "%" };
    newcolorBarPickerBackgroundColors.push(hex);
    this.setState(
      {
        colorBarPickerBackgroundColors: newColorBarPickerLefts,
        colorBarPickerBackgroundColors: newcolorBarPickerBackgroundColors
      },
      this.firebase.addPointerWaveEffect(
        this.props.match.params.id,
        index,
        left,
        hex
      )
    );
  };

  onDeletePointerColorBarPicker = () => {
    const {
      pointerLeftLocations,
      pointerBackgroundColors,
      pointerSelectedIndex
    } = this.state;
    if (pointerLeftLocations.length < 2) {
      return;
    }

    let newPointerLeftLocations = pointerLeftLocations.splice(0);
    let newPointerBackgroundColors = pointerBackgroundColors.splice(0);
    newPointerLeftLocations = newPointerLeftLocations.filter(function(val) {
      return val !== newPointerLeftLocations[pointerSelectedIndex];
    });
    newPointerBackgroundColors = newPointerBackgroundColors.filter(function(
      val
    ) {
      return val !== newPointerBackgroundColors[pointerSelectedIndex];
    });
    this.setState({
      pointerLeftLocations: newPointerLeftLocations,
      pointerBackgroundColors: newPointerBackgroundColors
    });
  };

  updateDatabaseClusterEffect(coordinate, hexColor) {
    const { selectedEffect } = this.state;

    if (selectedEffect === "Static Color") {
      for (let i = 0; i < 60; i++) {
        this.firebase.setClusterEffect(
          this.props.match.params.id,
          coordinate,
          i,
          hexColor
        );
      }
    }
  }

  updateSpeed(value) {
    this.setState({
      speed: value
    });
  }

  renderLogic() {
    return (
      <MainContainer>
        <div className="row">
          {this.state.popup ? this.renderPopup() : this.renderSideNav()}
          {this.renderCluster()}
        </div>
      </MainContainer>
    );
  }

  renderSideNav() {
    let { toggleAdvance, selectedEffect, hexOrientation } = this.state;
    return (
      <ColumnColor className="col-md-3">
        <Navigation>
          <SideNav defaultSelectedPath="1">
            <SlimContainer>
              {/*{toggleAdvance ? (
                    <MenuType>Advanced Customization</MenuType>
                  ) : (
                    <MenuType>Simple Customization</MenuType>
                  )}
                  */}
              <Divider />
              <div className="row">
                <div className="col-md-6">
                  <div className="orientation-block">
                    <h5>Orientation:</h5>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        checked={!hexOrientation}
                        onChange={e => this.toggleOrientation()}
                        type="radio"
                        name="options"
                        value="Flat"
                      />
                      <label className="form-check-label">Flat</label>
                    </div>
                    <br />
                    <div className="form-check">
                      <label className="form-check-label">
                        <input
                          className="form-check-input"
                          checked={hexOrientation}
                          onChange={e => this.toggleOrientation()}
                          type="radio"
                          name="options"
                          value="Pointy"
                        />
                        Pointy
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="effect-block">
                    <h5>Effect:</h5>
                    <select
                      value={selectedEffect}
                      onChange={e => {
                        this.setState(
                          {
                            selectedEffect: e.target.value
                          },
                          () => this.onClickClear()
                        );
                      }}
                      className="form-control"
                    >
                      <option />
                      <option>Static Color</option>
                      <option>Wave</option>
                    </select>
                  </div>
                </div>
              </div>
              <Divider />
              {selectedEffect === "Wave" && toggleAdvance && (
                <div className="pick-block">
                  <h5>Pick Order</h5>
                  <button className="btn btn-light" value="Pick">
                    Pick
                  </button>
                </div>
              )}
            </SlimContainer>
            {this.renderRightSideNav()}
          </SideNav>
        </Navigation>
      </ColumnColor>
    );
  }

  renderPopup() {
    let {
      popup,
      hexColor,
      colorBarPickerBackgroundColors,
      colorBarPickerLefts
    } = this.state;
    return (
      <ColumnColor
        className="col-md-3"
        style={{ paddingRight: "5px", minWidth: 470 }}
      >
        <Navigation>
          <SideNav defaultSelectedPath="1">
            <SlimContainer>
              <FontAwesomeIcon
                icon={faTimesCircle}
                color="white"
                style={{
                  display: "inline-block",
                  float: "right",
                  marginTop: "2%"
                }}
                onClick={e => this.setState({ popup: !popup })}
              />
              <div style={{ marginTop: 60 }}>
                <ColorBarPicker
                  leftPositions={colorBarPickerLefts}
                  backgroundColors={colorBarPickerBackgroundColors}
                  onAddPointer={this.onAddPointerColorBarPicker}
                  onDeletePointer={this.onDeletePointerColorBarPicker}
                  onMovePointer={this.onLeftChangeColorBarPicker}
                />
              </div>
              <div style={{ marginTop: 30 }}>
                <ChromePicker
                  color={hexColor}
                  onChangeComplete={this.handleChange}
                />
              </div>
            </SlimContainer>
          </SideNav>
        </Navigation>
      </ColumnColor>
    );
  }

  renderRightSideNav() {
    const {
      selectedEffect,
      hexColor,
      colorBarPickerLefts,
      colorBarPickerBackgroundColors,
      toggleAdvance,
      toggleSplit,
      popup,
      speed,
      width
    } = this.state;

    if (toggleAdvance) {
      return (
        <SlimContainer>
          {selectedEffect === "Static Color" && (
            <div>
              <p>
                <h5>Bucket</h5>- Fills the selected hexagon with color
              </p>
              <ChromePicker
                color={hexColor}
                onChangeComplete={this.handleChange}
              />
              <Divider />
            </div>
          )}

          {selectedEffect === "Wave" && <p>Test</p>}
          <hr />
        </SlimContainer>
      );
    } else if (!toggleAdvance) {
      return (
        <SlimContainer>
          {this.state.selectedEffect === "Static Color" && (
            <div>
              <h5>Clear</h5>
              <p>- Deselects hexagons</p>
              <button
                className="form-control"
                onClick={e => this.onClickClear()}
              >
                Clear
              </button>
              <br />
              <h5>Bucket</h5>
              <p>- Fills the selected hexagon with color</p>
              <ChromePicker
                color={hexColor}
                onChangeComplete={this.handleChange}
              />
            </div>
          )}
          {this.state.selectedEffect === "Wave" && (
            <div>
              <p>Color Bar</p>
              <ColorBarStatic
                pointerPositions={colorBarPickerLefts}
                pointerColors={colorBarPickerBackgroundColors}
                onClick={e => this.setState({ popup: !popup })}
              />
              <Divider />
              <h5>Properties</h5>
              <br />
              <div className="row">
                <div className="col-md-12">
                  <label>Speed</label>
                  <input
                    className="form-control"
                    type="number"
                    name="speed"
                    min="0"
                    max="50"
                    value={speed}
                    onChange={e => this.updateSpeed(e.target.value)}
                  />
                  <br />
                  <Slider
                    min="0"
                    max="50"
                    value={speed}
                    onChange={e => this.updateSpeed(e.target.value)}
                  />
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-md-8">
                  <label>Width (%)</label>
                  <input
                    className="form-control"
                    type="number"
                    min="0"
                    max="100"
                    value={width}
                    onChange={e => this.setState({ width: e.target.value })}
                  />
                </div>
                <div className="col-md-4">
                  <label>Split</label>
                  <br />
                  <Toggle
                    style={{ textAlight: "center" }}
                    checked={toggleSplit}
                    onToggle={value =>
                      this.setState({ toggleSplit: !toggleSplit })
                    }
                  />
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-md-12">
                  <Knob />
                </div>
              </div>
            </div>
          )}
        </SlimContainer>
      );
    } else {
      return "";
    }
  }

  renderCluster() {
    return (
      <div className="col-md-9">
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
            {/* <Toggle
              label="Simple"
              labelRight="Advanced"
              style={{ float: "right" }}
              checked={this.state.toggleAdvance}
              onToggle={value =>
                this.setState({ toggleAdvance: !this.state.toggleAdvance })
              }
            />
            */}
          </CardContainer>
        </SlimContainer>
      </div>
    );
  }

  renderLoading() {
    return (
      <MainContainer>
        <SlimContainer>
          <CardContainer
            type="card"
            title="Clusters"
            style={{ border: "none" }}
          >
            Loading...
          </CardContainer>
        </SlimContainer>
      </MainContainer>
    );
  }

  render() {
    return this.state.isClusterLoaded
      ? this.renderLogic()
      : this.renderLoading();
  }
}
export default withFirebase(HexagonProfile);

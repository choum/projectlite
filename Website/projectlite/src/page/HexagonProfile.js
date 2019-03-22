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
      isSelected: {},
      selected: "firfe",
      hexColor: "",
      rgbColor: ""
    };

    this.firebase = this.props.firebase;
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.dbref = this.getData();

    this.printClusterEffers();
    // this.firebase.setClusterEffect(
    //   this.props.match.params.id,
    //   "1,-1,0",
    //   "A",
    //   "A331F1"
    // );
  }

  componentWillUnmount() {
    this.dbref.off();
  }

  // remove when done
  printClusterEffers() {
    this.firebase.getClusterEffect(this.props.match.params.id, val => {
      console.log(val);
    });
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
      let isSelected = {};
      let clusterKeys = Object.keys(val.Layout);

      this.firebase.getClusterLayout(this.props.match.params.id, val =>
        console.log("val", val)
      );

      for (let i = 0; i < clusterKeys.length; i++) {
        isSelected[clusterKeys[i]] = false;
      }

      this.setState({
        clusterData: val,
        hexOrientation: val.Orientation,
        isClusterLoaded: true,
        isSelected: isSelected
      });
    });
  }

  onPress() {
    console.log("button pressed");
  }

  renderSideNav() {
    let { toggleAdvance, selectValue, hexOrientation, isSelected } = this.state;
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
                      value={selectValue}
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
                  {selectValue === "Wave" && toggleAdvance && (
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
                  <Wrap>{JSON.stringify(isSelected)}</Wrap>
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
    let { isSelected, hexColor, rgbColor } = this.state;
    //get keys/ids
    let clusterKeys = Object.keys(isSelected);

    //go through all ids
    for (let i = 0; i < clusterKeys.length; i++) {
      // store html
      let element = document.getElementById(clusterKeys[i]);
      //look through the html snippet for a polygon element
      let polygon = element.querySelector("polygon");

      if (isSelected[clusterKeys[i]] === true) {
        polygon.style.stroke = "green";
      } else {
        //not selected then default color
        polygon.style.stroke = "#666";
      }

      if (isSelected[clusterKeys[i]] === true && !(hexColor === "")) {
        if (!(rgbColor === polygon.style.fill)) {
          polygon.style.fill = hexColor;
        }
      }
    }
    this.setState({ hexColor: "" });
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

  renderRightSideNav() {
    let allFalse = Object.keys(this.state.isSelected).every(
      k => !this.state.isSelected[k]
    );
    let isAdvanced = this.state.toggleAdvance;
    if (!allFalse && isAdvanced) {
      return (
        <SlimContainer>
          <p>Color</p>
          <p>Color wheel goes here</p>
          {this.state.selectValue === "Wave" && <p>test</p>}
          <hr />
        </SlimContainer>
      );
    } else if (!allFalse && !isAdvanced) {
      return (
        <div>
          <p>Pick a color and watch the magic!</p>
          <ChromePicker
            color={this.state.hexColor}
            onChangeComplete={this.handleChange}
          />
        </div>
      );
    } else {
      return "";
    }
  }

  onClickSelect(hexID) {
    console.log(hexID);
    let isSelected = this.state.isSelected;
    isSelected[hexID]
      ? (isSelected[hexID] = false)
      : (isSelected[hexID] = true);
    this.pickColor();
    this.setState({ isSelected: isSelected });
  }

  onClickClear() {
    let clusterKeys = Object.keys(this.state.isSelected);
    let isSelected = {};
    for (let i = 0; i < clusterKeys.length; i++) {
      isSelected[clusterKeys[i]] = false;
    }
    this.setState({ isSelected: isSelected });
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
              selected={this.state.isSelected}
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

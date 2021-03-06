import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { ChromePicker } from "react-color";

import ColorBarPointer from "./ColorBarPointer";
import * as logic from "./ColorBarLogic";

const styles = {
  outer: {
    position: "relative",
    width: "75%",
    height: "30px",
    display: "inline-block"
  },
  inner: {
    position: "absolute",
    top: "0px",
    right: "0px",
    bottom: "0px",
    left: "0px",
    borderRadius: "2px",
    display: "inline-block"
  },
  container: {
    padding: "0px 2px",
    position: "relative",
    height: "100%",
    borderRadius: "2px"
  }
};

class ColorBarPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pointerSelectedIndex: 0,
      pointerLeftLocations: [],
      pointerBackgroundColors: [],
      lastLeftVal: 0
    };
  }

  componentDidMount() {
    this.setState({
      pointerLeftLocations: this.props.leftPositions,
      pointerBackgroundColors: this.props.backgroundColors
    });
  }

  componentWillUnmount() {
    window.removeEventListener("mousemove", this.handleChange);
    window.removeEventListener("mouseup", this.handleMouseUp);
  }

  handleMouseMove = e => {
    let { pointerLeftLocations, pointerSelectedIndex } = this.state;
    let leftVal = logic.calculatePercentChange(
      e,
      this.container,
      pointerLeftLocations,
      pointerSelectedIndex
    );
    let newPointerLeftLocations = pointerLeftLocations.slice(0);
    newPointerLeftLocations[pointerSelectedIndex] = { left: leftVal };
    this.setState(
      {
        pointerLeftLocations: newPointerLeftLocations,
        lastLeftVal: parseFloat(leftVal)
      },
      () => {
        // update database left value
        this.props.onMovePointer(pointerSelectedIndex, parseFloat(leftVal));
      }
    );
  };

  handleMouseDown = (e, index) => {
    e.preventDefault();
    window.addEventListener("mousemove", this.handleMouseMove);
    window.addEventListener("mouseup", this.handleMouseUp);
    this.setState({ pointerSelectedIndex: index });
  };

  handleMouseUp = () => {
    const { pointerSelectedIndex, lastLeftVal } = this.state;

    // // update database left value
    // this.props.onMovePointer(pointerSelectedIndex, lastLeftVal);

    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("mouseup", this.handleMouseUp);
  };

  onAddClick = () => {
    const { pointerLeftLocations, pointerBackgroundColors } = this.state;
    // no add if length > than 6 or no room to add
    if (
      pointerLeftLocations.length > 6 ||
      parseFloat(pointerLeftLocations[pointerLeftLocations.length - 1]) > 90
    ) {
      return;
    }

    let newPointerLeftLocations = pointerLeftLocations.splice(0);
    let newPointerBackgroundColors = pointerBackgroundColors.splice(0);
    let lastColor =
      newPointerBackgroundColors[newPointerBackgroundColors.length - 1];
    newPointerLeftLocations.push({ left: "95%" });
    newPointerBackgroundColors.push(lastColor);

    // add new pointer to db
    this.props.onAddPointer(newPointerLeftLocations.length - 1, 95, lastColor);

    this.setState({
      pointerLeftLocations: newPointerLeftLocations,
      pointerBackgroundColors: newPointerBackgroundColors
    });
  };

  onDeleteClick = () => {
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

    newPointerLeftLocations = newPointerLeftLocations.filter(
      (val, index) => index !== pointerSelectedIndex
    );
    newPointerBackgroundColors = newPointerBackgroundColors.filter(
      (val, index) => index !== pointerSelectedIndex
    );

    // update db
    this.props.onDeletePointer(
      newPointerLeftLocations,
      newPointerBackgroundColors
    );

    this.setState({
      pointerLeftLocations: newPointerLeftLocations,
      pointerBackgroundColors: newPointerBackgroundColors
    });
  };

  updatePointerColor = color => {
    const { pointerBackgroundColors, pointerSelectedIndex } = this.state;
    let newPointerBackgroundColors = pointerBackgroundColors.map(
      (oldColor, index) =>
        index === pointerSelectedIndex ? color.hex : oldColor
    );

    this.props.onChangeColor(
      newPointerBackgroundColors,
      pointerSelectedIndex,
      color.hex
    );

    this.setState({
      pointerBackgroundColors: newPointerBackgroundColors
    });
  };

  render() {
    const {
      pointerLeftLocations,
      pointerBackgroundColors,
      pointerSelectedIndex
    } = this.state;

    return (
      <div>
        <div style={styles.outer}>
          <div style={styles.inner}>
            <div
              style={{
                ...styles.container,
                background: logic.getGradient(
                  pointerLeftLocations,
                  pointerBackgroundColors
                )
              }}
              ref={container => (this.container = container)}
            >
              {pointerLeftLocations.map((i, index) => (
                <div
                  key={"ids" + index}
                  style={{
                    position: "absolute",
                    ...pointerLeftLocations[index]
                  }}
                  onMouseDown={e => this.handleMouseDown(e, index)}
                  ref={element => (this["pointer" + index] = element)}
                >
                  <ColorBarPointer
                    backgroundColor={pointerBackgroundColors[index]}
                    enabled={pointerSelectedIndex === index}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <FontAwesomeIcon
          icon={faPlus}
          size="2x"
          style={{
            marginLeft: "30px",
            marginRight: "10px",
            opacity: pointerLeftLocations.length > 5 ? 0.5 : 1
          }}
          onClick={this.onAddClick}
        />
        <FontAwesomeIcon
          icon={faTrash}
          size="2x"
          style={{ opacity: pointerLeftLocations.length > 1 ? 1 : 0.5 }}
          onClick={this.onDeleteClick}
        />
        <div style={{ marginTop: 30 }}>
          <ChromePicker
            color={pointerBackgroundColors[pointerSelectedIndex]}
            onChangeComplete={this.updatePointerColor}
          />
        </div>
      </div>
    );
  }
}

export default ColorBarPicker;

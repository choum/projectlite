import React from "react";
import * as staticLogic from "./ColorBarStaticLogic";

const styles = {
  outer: {
    position: "relative",
    width: "100%",
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

const ColorBarStatic = props => {
  const { pointerPositions, pointerColors, onClick } = props;
  return (
    <div style={styles.outer} onClick={onClick}>
      <div style={styles.inner}>
        <div
          style={{
            ...styles.container,
            background: staticLogic.getGradient(pointerPositions, pointerColors)
          }}
        />
      </div>
    </div>
  );
};

export default ColorBarStatic;

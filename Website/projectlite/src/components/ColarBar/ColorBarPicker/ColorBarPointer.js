// presentational component
// dot on the slider
import React from "react";

const styles = {
  picker: {
    width: "33px",
    height: "33px",
    borderRadius: "50%",
    transform: "translate(-9px, -1px)",
    boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.37)"
  },
  arrow: {
    width: 0,
    height: 0,
    borderLeft: "15px solid transparent",
    borderRight: "15px solid transparent",
    borderTop: "15px solid #FFFFFF",
    transform: "translate(2px, -13px)"
  }
};

const ColorBarPointer = props => {
  return (
    <div style={{ ...styles.picker, backgroundColor: props.backgroundColor }}>
      {props.enabled && <div style={styles.arrow} />}
    </div>
  );
};

export default ColorBarPointer;

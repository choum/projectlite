import React from "react";

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
            background: getGradient(pointerPositions, pointerColors)
          }}
        />
      </div>
    </div>
  );
};

const getGradient = (pointerPositions, pointerColors) => {
  let gradient = "linear-gradient(to right, ";
  const suffix = ", ";

  gradient = gradient.concat(pointerColors[0] + " 0" + suffix);

  for (let i = 0; i < pointerPositions.length; i++) {
    gradient = gradient.concat(
      pointerColors[i] + " " + pointerPositions[i].left + suffix
    );
  }

  gradient = gradient.concat(
    pointerColors[pointerPositions.length - 1] + " 100%)"
  );

  return gradient;
};

export default ColorBarStatic;

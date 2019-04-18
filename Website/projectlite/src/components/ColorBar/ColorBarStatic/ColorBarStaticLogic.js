// goes through positions and concats all values into a lienar-gradient string
export const getGradient = (pointerPositions, pointerColors) => {
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

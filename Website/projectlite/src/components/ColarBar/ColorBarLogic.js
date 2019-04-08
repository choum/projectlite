// generate css gradient string, then return
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

export const calculatePercentChange = (
  e,
  container,
  locationList,
  selectedIndex
) => {
  // clientWidth is zero for inline elements and elements with no css
  // otherwise, inner width of an elemnt in pixels, includes padding no borders
  // margins and vertical scrollbars
  const containerWidth = container.clientWidth;
  const multiplyFactor = 1 / containerWidth;
  // pageX: returns horizontal coordiante at which mouse was clicked relative to entire document
  const x = e.pageX;
  //getBoundingClientReact().left : size of the element and its position relative to the viewport....brilliant for dealing with absolute
  // window.pageXoffset : aka scrolX returns # of pixels that document is currently scroleld horizontally, subpixel precise
  let leftCurrentRaw =
    x - (container.getBoundingClientRect().left + window.pageXOffset);

  let leftCurrentConverted = Math.floor(leftCurrentRaw * multiplyFactor * 100);

  let hasLeft = locationList[selectedIndex - 1] ? true : false;
  let hasRight = locationList[selectedIndex + 1] ? true : false;

  let leftLeft = hasLeft
    ? parseFloat(locationList[selectedIndex - 1].left)
    : null;
  let leftRight = hasRight
    ? parseFloat(locationList[selectedIndex + 1].left)
    : null;

  // @TODO make the 4 and 2 dyanmic based on a calculation
  if (leftLeft != null && leftCurrentConverted < leftLeft + 11) {
    leftCurrentConverted = leftLeft + 11;
  } else if (leftRight != null && leftCurrentConverted > leftRight - 11) {
    leftCurrentConverted = leftRight - 11;
  }

  if (leftCurrentConverted < 1) {
    leftCurrentConverted = 0;
  } else if (leftCurrentConverted > 99) {
    leftCurrentConverted = 99;
  }

  return leftCurrentConverted + "%";
};

const Effect = require("./Effect").Effect;

class SideTest extends Effect {
  /**
   * Create a new effect processor
   * @param {Object} layout The current system layout
   * @param {Object} effectobj Current system effect
   */
  constructor(layout, effectobj) {
    super(layout, effectobj);
    this.rotation = {};
    for (let c in layout) {
      this.rotation[
        c
          .split(",")
          .slice(0, 2)
          .join(",")
      ] = layout[c].Rotation;
    }
  }

  /**
   * Gets the pixel value for any LED on an arbitrary panel
   * @param {Number} x First coordinate of panel
   * @param {Number} y Second coordinate of panel
   * @param {Number} n LED number in panel
   * @returns {Array}
   */
  getpixelvalue(x, y, n) {
    if (Tops[this.rotation[x + "," + y]].includes(n)) return [255, 255, 255];
    return [0, 0, 0];
  }
}

const Tops = [
  [0, 1, 2, 3, 4, 5],
  [5, 6, 23, 24],
  [24, 45, 46, 59],
  [54, 55, 56, 57, 58, 59],
  [35, 36, 53, 54],
  [0, 13, 14, 35]
];

exports.Effect = SideTest;

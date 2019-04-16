const Effect = require("./Effect").Effect;

class StaticEffect extends Effect {
  /**
   * Create a new effect processor
   * @param {Object} layout The current system layout
   * @param {Object} effectobj Current system effect
   */
  constructor(layout, effectobj) {
    super(layout, effectobj);
    this.clusters = {};
    for (let c in layout) {
      this.clusters[
        c
          .split(",")
          .slice(0, 2)
          .join(",")
      ] = this.hextoarr(effectobj[c][0]);
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
    return this.clusters[x + "," + y];
  }
}

exports.Effect = StaticEffect;

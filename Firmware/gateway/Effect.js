class Effect {
  /**
   * Create a new effect processor
   * @param {Object} layout The current system layout
   * @param {Object} effectobj Current system effect
   */
  constructor(layout, effectobj) {
    this.addresses = [];
    for (let c in layout) {
      let y = c.split(",");
      this.addresses[layout[c].Address] =
      [Number(y[0]), Number(y[1])];
    }
    this.test = Date.now();
  }

  /**
   * Gets the pixel value for any LED on an arbitrary panel
   * @param {Number} x First coordinate of panel
   * @param {Number} y Second coordinate of panel
   * @param {Number} n LED number in panel
   * @returns {Array}
   */
  getpixelvalue(x, y, n) {
    // Return default color values
    switch (n % 3) {
      case 0:
        return [255, 0, 0];
      case 1:
        return [0, 255, 0];
      case 2:
        return [0, 0, 255];
      default:
        return [255, 255, 255];
    }
  }

  /**
   * Get the values for all LEDs in a panel
   * @param {Number} x First coordinate of panel
   * @param {Number} y Second coordinate of panel
   * @returns {Array}
   */
  getpanelstream(x, y) {
    let data = [];
    for (let i = 0; i < parameters.NUMLED; i++) {
      data.push(this.getpixelvalue(x, y, i));
    }
    return data;
  }

  /**
   * Gets the full addressed datastream for an effect
   * @returns {Array}
   */
  getdata() {
    let data = [];
    for (let i in this.addresses)
      data.push(...this.getpanelstream(...this.addresses[i]));
    return data;
  }

  /**
   * Converts a hex format color code to RGB array
   * @param {String} hex The hex value to parse
   * @returns {Array}
   */
  hextoarr(hex) {
    return [
      parseInt(hex.substr(1, 2), 16) / 1,
      parseInt(hex.substr(3, 2), 16) / 1,
      parseInt(hex.substr(5, 2), 16) / 1
    ];
  }
}

const parameters = {
  NUMLED: 60
};

exports.Effect = Effect;

const Effect = require("./Effect").Effect;

class WaveEffect extends Effect {
  /**
   * Create a new effect processor
   * @param {Object} layout The current system layout
   * @param {Object} effectobj Current system effect
   */
  constructor(layout, effectobj) {
    super(layout, effectobj);
    this.clusters = {};
    let maxx = 0;
    let minx = 0;
    let maxy = 0;
    let miny = 0;
    this.rotation = {};
    for (let c in layout) {
      let d = c.split(",");
      if (d[0] > maxx) maxx = Number(d[0]);
      if (d[0] < minx) minx = Number(d[0]);
      if (d[1] > maxy) maxy = Number(d[1]);
      if (d[1] < miny) miny = Number(d[1]);
      this.rotation[d.slice(0, 2).join(",")] = layout[c].Rotation;
    }
    let topleft = HexagonOffset(minx, maxy);
    let bottomright = HexagonOffset(maxx, miny);
    this.orgintl = [topleft[0] - 1, topleft[1] + 1];
    this.orginbr = [bottomright[0] + 1, bottomright[1] - 1];
    this.size = [
      this.orginbr[0] - this.orgintl[0],
      this.orginbr[1] - this.orgintl[1]
    ];

    this.colors = [];

    for (let g in effectobj.Hex) {
      this.colors.push({
        color: this.hextoarr(effectobj.Hex[g]),
        left: effectobj.Left[g]
      });
    }
    this.aspeed = false;
    if (effectobj.WaveSpeed > 0) this.aspeed = 5000 - 45 * effectobj.WaveSpeed;

    let lowc = false;
    let lowv = 100;
    let highc = false;
    let highv = 0;
    for (let c of this.colors) {
      if (c.left > highv) {
        highc = c.color;
        highv = c.left;
      }
      if (c.left < lowv) {
        lowc = c.color;
        lowv = c.left;
      }
    }

    if (this.aspeed) {
      if (lowc < 100 - highc) highc = lowc;
      else lowc = highc;
    }

    if (lowc !== 0)
      this.colors.push({
        color: lowc,
        left: 0
      });

    if (highc !== 100)
      this.colors.push({
        color: highc,
        left: 100
      });
  }

  /**
   * Gets the pixel value for any LED on an arbitrary panel
   * @param {Number} x First coordinate of panel
   * @param {Number} y Second coordinate of panel
   * @param {Number} n LED number in panel
   * @returns {Array}
   */
  getpixelvalue(x, y, n) {
    // if(x!==0 || y!==0) return[0,0,0];
    // return[255,255,255];
    let t = HexagonOffset(x, y);
    let p = RotationTransform(...PixelOffset(n), this.rotation[x + "," + y]);
    let pos = [t[0] + p[0], t[1] + p[1]];
    let gradv = (pos[1] - this.orgintl[1]) / this.size[1];
    if (this.aspeed) gradv = (gradv + (Date.now() - offset) / this.aspeed) % 1;
    return interpolateA(this.colors, gradv);
  }
}

function interpolateA(colors, frac) {
  let lowc = false;
  let highc = false;
  let closestunder = -1;
  let closestupper = 101;
  let fleft = frac * 100;
  for (let c of colors) {
    if (c.left > closestunder && c.left < fleft) {
      closestunder = c.left;
      lowc = c.color;
    }
    if (c.left < closestupper && c.left >= fleft) {
      closestupper = c.left;
      highc = c.color;
    }
  }

  return interpolateC(
    lowc,
    highc,
    (frac - closestunder / 100) / ((closestupper - closestunder) / 100)
  );
}

function interpolateC(col1, col2, frac) {
  return [
    frac * (col2[0] - col1[0]) + col1[0],
    frac * (col2[1] - col1[1]) + col1[1],
    frac * (col2[2] - col1[2]) + col1[2]
  ];
}

function RotationTransform(x, y, r) {
  let ang = (Math.PI * r) / 3;
  let x_rot = x * Math.cos(ang) - y * Math.sin(ang);
  let y_rot = y * Math.cos(ang) + x * Math.sin(ang);
  return [x_rot, y_rot];
}

function PixelOffset(n) {
  let xo = 0,
    yo = 0;
  if (n < 6) {
    xo = -3;
    yo = n - 3 + 1;
  } else if (n < 14) {
    xo = -2;
    yo = 4 - (n - 6);
  } else if (n < 24) {
    xo = -1;
    yo = n - 14 - 5 + 1;
  } else if (n < 36) {
    xo = 0;
    yo = 6 - (n - 24);
  } else if (n < 46) {
    xo = 1;
    yo = n - 36 - 5 + 1;
  } else if (n < 54) {
    xo = 2;
    yo = 4 - (n - 46);
  } else {
    xo = 3;
    yo = n - 54 - 3 + 1;
  }
  yo = (yo * 2) / 12 - 1 / 24;
  xo = (xo * 2) / 7;
  return [xo, yo];
}

function HexagonOffset(x, y) {
  x_r = 2 * x + y;
  y_r = 1.5 * y;
  return [x_r, y_r];
}

const offset = Date.now();

exports.Effect = WaveEffect;

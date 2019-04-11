const firebase = require("firebase/app");
const auth = require("firebase/auth");
const db = require("firebase/database");

const config = require("./firebase.json");

class Gateway {
  constructor() {
    console.log("Project Lite Local Gateway");

    if (process.argv.length < 3) {
      console.error("Please supply a system code");
      return;
    }
    this.cluster = process.argv[2];
    console.log("Using system: ", this.cluster);

    firebase.initializeApp(config);
    this.auth = firebase.auth();
    this.db = firebase.database();

    this.db
      .ref("clusters/" + this.cluster + "/Name")
      .once("value", this.getName.bind(this));

    this.layout = {};
    this.effectObj = { Type: null };
    this.effect = new Null_Effect({});

    setTimeout(this.getDataSnapshot.bind(this), 5000);
  }

  getName(snap) {
    this.name = snap.val();
    if (this.name === null) {
      console.error("Cluster not found!");
    } else {
      console.log("Cluster found: ", this.name);
    }
    (this.layoutref = this.db.ref("clusters/" + this.cluster + "/Layout")).on(
      "value",
      this.getLayout.bind(this)
    );
    (this.effectsref = this.db.ref("clusters/" + this.cluster + "/Effect")).on(
      "value",
      this.getEffects.bind(this)
    );
  }

  getLayout(snap) {
    this.layout = snap.val();
    console.log("Found " + Object.keys(this.layout).length + " Panels");
    this.effect = this.effect[this.effectObj.Type]
      ? new this.effect[this.effectObj.Type](this.effectObj, this.layout)
      : new Null_Effect({});
  }

  getEffects(snap) {
    this.effectObj = snap.val();
    console.log("Effects Updated: ", this.effectObj.Type);
    this.effect = effects[this.effectObj.Type]
      ? new effects[this.effectObj.Type](this.effectObj, this.layout)
      : new Null_Effect({});
    this.getDataSnapshot();
  }

  getDataSnapshot() {
    let clusters = [];
    for (let c in this.layout) {
      clusters[this.layout[c].Address] = c.split(",");
    }
    // console.log(clusters);
    for (let i = 0; i < clusters.length; i++) {
      let data = this.effect.getPanelColors(clusters[i][0], clusters[i][1]);
      clusters[i] = data;
    }
    // console.log(clusters);
    let data = [];
    clusters.forEach(c => {
      data = data.concat(c);
    });
  }

  close() {
    this.layoutref.off();
    this.effectsref.off();
  }
}

function hextoarr(hex) {
  return [
    parseInt(hex.substr(1, 2), 16) / 255,
    parseInt(hex.substr(3, 2), 16) / 255,
    parseInt(hex.substr(5, 2), 16) / 255
  ];
}

class Panel {
  constructor(location) {}
}

class CalculationEffect {
  constructor(layout) {}
}

class Static_Effect {
  constructor(effect_data, layout) {
    console.log("new static");
    this.clusters = [];
    for (let c in layout) {
      let y = c.split(",");
      let data = [];
      for (let d of effect_data[c]) {
        if (d) data.push(hextoarr(d));
      }

      this.clusters[y[0] + "," + y[1]] = data;
    }
  }
  getPanelColors(x, y) {
    if (this.clusters[x + "," + y]) return this.clusters[x + "," + y].slice(1);
    else return [];
  }
}

class Wave_Effect extends CalculationEffect {
  constructor(effect_data, layout) {
    super({});
  }
}

class Null_Effect {
  constructor(effect_data, layout) {
    console.log("new null");
  }
  getPanelColors(x, y) {
    let leds = [];
    for (let i = 0; i < 60; i++) leds.push([1, 1, 1]);
    return leds;
  }
}

const effects = {
  static: Static_Effect,
  wave: Wave_Effect,
  null: Null_Effect
};

run = new Gateway();

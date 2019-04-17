const EFinder = require("./EFinder");
const firebase = require("firebase/app");
const auth = require("firebase/auth");
const db = require("firebase/database");
const config = require("./firebase.json");
const ws281x = require("rpi-ws281x-native");

/**
 * Gateway between database and hardware
 */
class Gateway {
  /**
   * Sets up new gateway for a cluster
   * @param {String} cluster The cluster id in the database
   */
  constructor(cluster) {
    this.checks = [false, false, false, true];
    this.initfirebase(cluster);
  }

  /**
   * Set up the references for firebase
   * @param {String} cluster The cluster to set reference on
   */
  initfirebase(cluster) {
    this.dbpath = "clusters/" + cluster;

    firebase.initializeApp(config);

    this.auth = firebase.auth();
    this.db = firebase.database();

    this.db.ref(this.dbpath + "/Name").once("value", this.onName.bind(this));
  }

  /**
   * Checks if ready to setup data send routine
   */
  checkdatasend() {
    if (this.checks[0] && this.checks[1] && this.checks[2] && this.checks[3]) {
      this.checks = [true, true, true, false];
      this.initdatasend();
    }
  }

  /**
   * Starts data send routine
   */
  initdatasend() {
    let len = Object.keys(this.layout).length * 60;
    this.pixelData = new Uint32Array(len);
    ws281x.init(len);

    process.on("SIGINT", function() {
      ws281x.reset();
      process.nextTick(function() {
        process.exit(0);
      });
    });

    setInterval(this.senddata.bind(this), 1000 / 10);
  }

  /**
   * Send the data out to the pixels
   */
  senddata() {
    try {
      let dataout = this.getEffect().getdata();
      for (let i = 0; i < dataout.length; i++)
        this.pixelData[i] = this.rgb2Int(...dataout[i]);
      ws281x.render(this.pixelData);
    } catch (e) {
      console.error("Could not send data! Issue with effect processing!");
      console.error(e);
    }
  }

  rgb2Int(r, g, b) {
    return ((r & 0xff) << 16) + ((g & 0xff) << 8) + (b & 0xff);
  }

  /**
   * Remove the firebase references
   */
  closefirebase() {
    if (this.refL) this.refL.off();
    if (this.refE) this.refE.off();
  }

  /**
   * Firebase callback for name received
   * @param {Object} snap Database snapshot
   */
  onName(snap) {
    this.name = snap.val();
    if (this.name === null) {
      console.error("Cluster not found!");
      return;
    } else {
      console.log("Connected to DB: ", this.name);
      this.checks[0] = true;
    }

    (this.refL = this.db.ref(this.dbpath + "/Layout")).on(
      "value",
      this.onLayout.bind(this)
    );

    (this.refE = this.db.ref(this.dbpath + "/Effect")).on(
      "value",
      this.onEffect.bind(this)
    );

    this.checks[0] = true;
    this.checkdatasend();
  }

  /**
   * Firebase callback for layout received
   * @param {Object} snap Database snapshot
   */
  onLayout(snap) {
    this.layout = snap.val();

    this.checks[1] = true;
    this.checkdatasend();
  }

  /**
   * Firebase callback for effect received
   * @param {Object} snap Database snapshot
   */
  onEffect(snap) {
    this.effect = snap.val();

    this.checks[2] = true;
    this.checkdatasend();
  }

  /**
   * Returns an effect
   */
  getEffect() {
    if (this.checks[1] || this.checks[2]) {
      this.effectobj = EFinder.GetEffect(this.layout, this.effect);
      this.checks[1] = false;
      this.checks[2] = false;
    }
    return this.effectobj;
  }
}

exports.Gateway = Gateway;

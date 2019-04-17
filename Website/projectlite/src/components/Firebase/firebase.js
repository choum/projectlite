import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = require("../../firebase.json");

export default class Firebase {
  constructor() {
    firebase.initializeApp(config);

    this.auth = firebase.auth();
    this.db = firebase.database();

    this.AuthStateChange = new CustomEvent();
    this.auth.onAuthStateChanged(e => {
      this.AuthStateChange.fire(e);
    });
  }

  // ********* Auth API *********
  getCurrentUser = () => this.auth.currentUser;

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => {
    return this.auth.sendPasswordResetEmail(email);
  };

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  doCreateUserWithEmailAndPassword = (email, password) => {
    return this.auth.createUserWithEmailAndPassword(email, password);
  };

  doSignInWithEmailAndPassword = (email, password) => {
    return this.auth.signInWithEmailAndPassword(email, password);
  };

  /* ********* Database API ********* */

  // get all clusters in db
  // @param function to return data
  // @return db ref & callback(objectOfClusters)
  getClusters = callback => {
    let data = this.db.ref("clusters/");
    data.on("value", function(snapshot) {
      callback(snapshot.val());
    });
    return data;
  };

  // get a cluster in db
  // @param cluster ID
  // @param callback function to return data
  // @return db ref & callback({Details, Effect, Layout})
  getCluster = (ID, callback) => {
    let data = this.db.ref("clusters/" + ID);
    data.on("value", function(snapshot) {
      callback(snapshot.val());
    });
    return data;
  };

  // @param cluster ID
  // @param callback function to return data
  // @return db ref & callback([Layout keys])
  getClusterLayout = (ID, callback) => {
    let data = this.db.ref("clusters/" + ID + "/Layout");
    data.on("value", function(snapshot) {
      callback(Object.keys(snapshot.val()));
    });
    return data;
  };

  // @param string ID - cluster ID
  // @param function(object) callback - function to return data
  // @return db ref
  // @return callback({Effect})
  getClusterEffect = (ID, callback) => {
    let data = this.db.ref("clusters/" + ID + "/Effect");
    data.on("value", function(snapshot) {
      callback(snapshot.val());
    });
    return data;
  };

  // @param string ID - cluster ID
  // @param function(object) callback - function to return data
  // @return db ref
  // @return callback({Effect})
  getClusterEffectSortByKey = (ID, callback) => {
    let data = this.db.ref("clusters/" + ID + "/Effect").orderByKey();
    data.on("value", function(snapshot) {
      callback(snapshot.val());
    });
    return data;
  };

  // @param string ID - cluster ID
  // @param  bool value - pointy(true) or flat(false)
  // @return db ref & callback({Effect})
  setClusterOrientation = (ID, value) => {
    let selection = this.db.ref("clusters/" + ID);
    selection.update({ Orientation: value });
  };

  // @param string ID - cluster ID
  // @param string coord - location of tile, "-1,2,-1"
  // @param string key - object key, led identifier "aA"
  // @param string value - object value, hex
  setClusterEffect = (ID, coord, key, value) => {
    let selection = this.db.ref("clusters/" + ID + "/Effect/" + coord);
    selection.update({ [key]: value });
  };

  // @param string ID - cluster ID
  // @param num groupID - id within fake array
  // @param string hex - hex pointer color
  // @param num left - left value
  addPointerWaveEffect = (ID, groupID, left, hex) => {
    this.db
      .ref("clusters/" + ID + "/Effect/Left/")
      .update({ ["group" + groupID]: left });
    this.db
      .ref("clusters/" + ID + "/Effect/Hex/")
      .update({ ["group" + groupID]: hex });
  };

  // @param string ID - cluster ID
  // @param num index - group number
  // @param num val - new left value
  leftChangeWaveEffect = (ID, index, val) => {
    this.db
      .ref("clusters/" + ID + "/Effect/Left/")
      .update({ ["group" + index]: val });
  };

  // remove will at index and update all other indexes
  // this includes both hex and left
  // @param string ID - cluster ID
  // @param num oldGroupCount
  // @param obj newHex - new obj of hex values
  // @param obj left - new obj of left numbers
  removePointerWaveEffect = (ID, newHex, left) => {
    let hexSend = {};
    let leftSend = {};

    for (let i = 0; i < newHex.length; i++) {
      hexSend["group" + i] = newHex[i];
      leftSend["group" + i] = parseFloat(left[i].left);
    }

    this.db.ref("clusters/" + ID + "/Effect/Left/").set(leftSend);
    this.db.ref("clusters/" + ID + "/Effect/Hex/").set(hexSend);
  };
}

class CustomEvent {
  constructor() {
    this.Handlers = {};
    this.Iterator = 1;
    this.RegisterHandler = this.RegisterHandler.bind(this);
    this.UnregisterHandler = this.UnregisterHandler.bind(this);
  }

  fire(e) {
    for (let [, Handler] of Object.entries(this.Handlers)) {
      Handler();
    }
  }

  RegisterHandler = callback => {
    this.Handlers[this.Iterator] = callback;
    return this.Iterator++;
  };

  UnregisterHandler = key => {
    delete this.Handlers[key];
  };
}

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

  // Auth API
  doCrateUser = (email, password) => {
    this.auth
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        return this.auth.createUserWithEmailAndPassword(email, password);
      })
      .catch(console.log);
  };

  doSignOut = () => this.auth.signOut();

  getCurrentUser = () => this.auth.currentUser;

  doSignIn = (email, password) => {
    this.auth
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        return this.auth.signInWithEmailAndPassword(email, password);
      })
      .catch(console.log);
  };

  // Database API
  getClusters = callback => {
    let data = this.db.ref("clusters/");
    data.on("value", function(snapshot) {
      callback(snapshot.val());
    });
    return data;
  };

  getCluster = (ID, callback) => {
    let data = this.db.ref("clusters/" + ID);
    data.on("value", function(snapshot) {
      callback(snapshot.val());
    });
    return data;
  };

  setClusterOrientation = (ID, value) => {
    let selection = this.db.ref("clusters/" + ID + "Orientation");
    selection.update({ Orientation: value });
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

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
  getCluster = callback => {
    let data = this.db.ref("clusters/");
    data.on("value", function(snapshot) {
      callback(snapshot.val());
    });
  };
}

class CustomEvent {
  constructor() {
    this.Handlers = {};
    this.Iterator = 1;
    //this.fire = this.fire.bind(this);
    this.RegisterHandler = this.RegisterHandler.bind(this);
    this.UnregisterHandler = this.UnregisterHandler.bind(this);
  }

  fire(e) {
    for (let [i, Handler] of Object.entries(this.Handlers)) {
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

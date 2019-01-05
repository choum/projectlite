import firebase from "firebase/app";
import "firebase/auth";

const config = require("../../firebase.json");

export default class Firebase {
  constructor() {
    firebase.initializeApp(config);
    this.auth = firebase.auth();
  }

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
}

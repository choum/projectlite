import app from "firebase/app";
import "firebase/auth";

const config = require("../../firebase.json");

export default class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
  }

  doCrateUser = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  getCurrentUser = () => this.auth.currentUser;
}

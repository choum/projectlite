import app from "firebase/app";
import "firebase/auth";

const config = require("../../firebase.json");

export default class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
  }
}

const firebase = require("firebase/app");
const auth = require("firebase/auth");
const db = require("firebase/database");

const config = require("./firebase.json");

function main() {
  console.log("Project Lite Local Gateway");

  if (process.argv.length < 3) {
    console.error("Please supply a system code");
    return;
  }
  console.log("Using system: ", process.argv[2]);

  firebase.initializeApp(config);
}

main();

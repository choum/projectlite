const Gateway = require("./Gateway").Gateway;

console.log("Project Lite Local Gateway");

function main() {
  if (process.argv.length < 3) {
    console.error("Please supply a system code");
    return;
  }
  let cluster = process.argv[2];

  let gw = new Gateway(cluster);
}

main();

var fs = require('fs');
const util = require('util');

const INPUTDATAFILE = "docs/data.json";

console.log("Reading data from '" + INPUTDATAFILE + "' ...");
var obj = JSON.parse(fs.readFileSync(INPUTDATAFILE, 'utf8'));

console.log(util.inspect(obj, showHidden=false, depth=3, colorize=true));


// Simple Addition Function in Javascript
function add(a, b) {
  return a+b
}
console.log(add(4, 6))

console.log(process.cwd());

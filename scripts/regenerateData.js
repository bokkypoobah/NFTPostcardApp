var fs = require('fs');
const util = require('util');

const INPUTDATAFILE = "docs/data.json";

console.log("Reading data from '" + INPUTDATAFILE + "' ...");
var obj = JSON.parse(fs.readFileSync(INPUTDATAFILE, 'utf8'));

console.log(util.inspect(obj, showHidden=false, depth=3, colorize=true));

console.log("allTokenIds: " + util.inspect(getAllTokenIds(obj), showHidden=false, depth=3, colorize=true));
console.log("allParents: " + util.inspect(getAllParents(obj), showHidden=false, depth=3, colorize=true));
console.log("allAttributes: " + util.inspect(getAllAttributes(obj), showHidden=false, depth=3, colorize=true));
console.log("allAncientDNAs: " + util.inspect(getAllAncientDNAs(obj), showHidden=false, depth=3, colorize=true));

function getAllTokenIds(obj) {
  return Object.keys(obj.tokens);
}

function getAllParents(obj) {
  let allParents = {};
  for (let tokenId in Object.keys(obj.tokens)) {
    let token = obj.tokens[tokenId];
    for (let parentIndex in token.parents) {
      let parent = token.parents[parentIndex];
      if (allParents[parent] === undefined) {
        allParents[parent] = 1;
      }
    }
  }
  return Object.keys(allParents);
}

function getAllAttributes(obj) {
  let allAttributes = {};
  for (let tokenId in Object.keys(obj.tokens)) {
    let token = obj.tokens[tokenId];
    for (let attributeIndex in token.attributes) {
      let attribute = token.attributes[attributeIndex];
      if (allAttributes[attribute] === undefined) {
        allAttributes[attribute] = 1;
      }
    }
  }
  return Object.keys(allAttributes);
}

function getAllAncientDNAs(obj) {
  let allAncientDNAs = {};
  for (let tokenId in Object.keys(obj.tokens)) {
    let token = obj.tokens[tokenId];
    for (let ancientDNAIndex in token.ancientDNA) {
      let ancientDNA = token.ancientDNA[ancientDNAIndex];
      if (allAncientDNAs[ancientDNA] === undefined) {
        allAncientDNAs[ancientDNA] = 1;
      }
    }
  }
  return Object.keys(allAncientDNAs);
}

// Simple Addition Function in Javascript
function add(a, b) {
  return a+b
}
console.log(add(4, 6))

console.log(process.cwd());

const Item = require("./ItemConstructor.js");
const Creature = require("./CreatureConstructor.js");

let cat = new Creature(
  2, // location
  "small cat", // shortName
  "A small gray and white cat. She seems supremely uninterested in your presence.", // lookDesc
  ["cat", "kitty", "kitten", "pussy", "animal"], // keywords
  100, // health
  40, // attack
  50, // defense
  ["moveRandom"], // script
  "wander", // attitude
  " wandering around.", // currently doing
  [], // inventory
  {"tail" : "It is long and tapered, like an iguana's, but much fuzzier."} // features

)

module.exports = {
  cat: cat
}
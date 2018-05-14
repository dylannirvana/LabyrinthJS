function Item(
  // arguments here
  shortName, lookDesc, keywords, startingLoc
  ) {
  // properties here
  this.shortName = shortName; // short name
  this.lookDesc = lookDesc; // long description
  this.keywords = keywords; // synonyms and keywords
  this.startingLoc = startingLoc;
}

let cellPhone = new Item(
  "cell phone",  // shortName
  "Your cell phone is a top-of-the-line Noxia Grunt 9, and has a whole ton of fun and useful apps. Too bad the battery is dead. Maybe you shouldn't have vlogged the entire Chauffr ride.",  // lookDesc
  ["cell", "phone", "noxia", "grunt", "cellphone"], // keywords
  ["playerInventory"] // starting location
);
cellPhone.invSize = 1;

let brick = new Item(
  "brick",  // shortName
  "A dusty brick of stone.",  // longDesc
  ["brick"], // keywords
  ["two"] // starting location
);
brick.invSize = 5;
brick.value = 2;

let bust = new Item(
  "bust",
  "A roughly-carved sculpture of an unknown gentleman. The unusually flat cranium does not assist any pretense of wisdom. There was once a name carved beneath the visage, but it has been scratched out.",
  ["bust", "sculpture", "head"],
  ["two"]
);
bust.feature = true;

let sword = new Item(
  "rusty sword",
  "This once-noble weapon was clearly the armament of a mighty warrior, but has since been laid low by the elements. It still has some heft to it, though. (And, you notice, the words 'Made in Pakistan' stamped on the pommel.",
  ["sword", "rusty", "blade"],
  ["three"]
);
sword.invSize = 10;
sword.wear = "wielded";
sword.value = 10;

let glowingWall = new Item(
  "glowing wall",
  "A fine marble wall with swirls of minerals and a distinct shimmer.",
  ["wall", "glowing"],
  ["six", "seven"]
)
glowingWall.feature = true;
glowingWall.lightSource = true;

let gate = new Item(
  "gate",
  "It's a pretty nasty looking thing, like it was repurposed from some old torture device.",
  ["gate", "iron"],
  ["seven", "eight"]
)
gate.feature = true;

let tail = new Item(
  "tail",
  "It is long and tapered, like an iguana's, but much fuzzier.",
  ["tail"],
  ["cat"]
)
tail.feature = true;

let horns = new Item(
  "horns",
  "The gracefully swept horns look freshly sharpened.",
  ["horns"],
  ["minotaur"]
)
horns.feature = true;

let jar = new Item(
  "glowing cage", 
  "Imagine a jar of fireflies. Now imagine the jar as a wire cage holding a few dozen absurdly-sized cockroaches with brilliantly glowing thoraxes. And eyes. Fortunately the bug bucket has a handle on top. Lucky you.",
  ["jar", "insect", "insects", "bugs", "light", "bucket", "roaches", "cage", "bug"],
  ["five"]
)
jar.invSize = 10;
jar.lightSource = true;

let collar = new Item(
  "cat collar",
  "It's a pretty bling collar for a random dungeon-cat. You're not sure what the fabric is, but the rocks mounted to it seem are glowing fiercely.",
  ["collar", "bracelet"],
  ["cat"]
)
collar.invSize = 2;
collar.wear = "arms";
collar.value = "1";
collar.lightSource = true;

module.exports = {
  cellPhone: cellPhone,
  brick: brick,
  bust: bust,
  sword: sword,
  glowingWall: glowingWall,
  tail: tail,
  horns: horns,
  jar: jar,
  collar: collar
}
// // In this module:

  // var MyObjectOrSomeCleverName = require("./my_object.js");

  // var my_obj_instance = new MyObjectOrSomeCleverName("foobar");

  // my_obj_instance.foo(); // => "foobar"

// // In the constructor module

  // function MyObject(bar) {
  //   this.bar = bar;
  // }

  // MyObject.prototype.foo = function foo() {
  //   console.log(this.bar);
  // };

  // module.exports = MyObject;
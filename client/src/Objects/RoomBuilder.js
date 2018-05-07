const Room = require("./RoomConstructor.js");
const Item = require("./ItemConstructor.js");
const Creature = require("./CreatureConstructor.js");

const room = [];

// Rooms

let newRoom = new Room(
  0,  // location
  "Room Zero", // name
  "This is Room 0. You shouldn't be in here.",  // desc
  [],  // [items]
  [],  // [entities]
  { to: undefined, minPass: true, visible: true, blocked: false }, // N
  { to: undefined, minPass: true, visible: true, blocked: false }, // NE
  { to: undefined, minPass: true, visible: true, blocked: false }, // E
  { to: undefined, minPass: true, visible: true, blocked: false }, // SE
  { to: undefined, minPass: true, visible: true, blocked: false }, // S
  { to: undefined, minPass: true, visible: true, blocked: false }, // SW
  { to: undefined, minPass: true, visible: true, blocked: false }, // W
  { to: undefined, minPass: true, visible: true, blocked: false }, // NW
  { to: undefined, minPass: true, visible: true, blocked: false }, // UP
  { to: undefined, minPass: true, visible: true, blocked: false }, // DOWN
  { to: undefined, minPass: true, visible: true, blocked: false }, // IN
  { to: undefined, minPass: true, visible: true, blocked: false }, // OUT
  [], // action script
  [] // features
);
room.push(newRoom);

newRoom = new Room(
  1,  // location
  "Room One", // name
  "This is Room 1.",  // desc
  [],  // [items]
  [],  // [entities]
  { to: undefined, minPass: true, visible: true, blocked: false }, // N
  { to: 11, minPass: false, visible: true, blocked: false }, // NE
  { to: undefined, minPass: true, visible: true, blocked: false }, // E
  { to: undefined, minPass: true, visible: true, blocked: false }, // SE
  { to: undefined, minPass: true, visible: true, blocked: false }, // S
  { to: undefined, minPass: true, visible: true, blocked: false }, // SW
  { to: 2, minPass: true, visible: true, blocked: false }, // W
  { to: undefined, minPass: true, visible: true, blocked: false }, // NW
  { to: undefined, minPass: true, visible: true, blocked: false }, // UP
  { to: undefined, minPass: true, visible: true, blocked: false }, // DOWN
  { to: undefined, minPass: true, visible: true, blocked: false }, // IN
  { to: undefined, minPass: true, visible: true, blocked: false }, // OUT
  [], // action script
  [] // features
);
room.push(newRoom);

let brick = new Item(
  1,  // itemId
  "brick",  // shortName
  "A dusty brick of stone.",  // longDesc
  ["brick"], // keywords
  5,  // invSize
  false, // wear
  2,  // value
);
let bust = new Item(
  2,
  "bust",
  "A roughly-carved sculpture of an unknown gentleman. The unusually flat cranium does not assist any pretense of wisdom. There was once a name carved beneath the visage, but it has been scratched out.",
  ["bust", "sculpture", "head"]
)
newRoom = new Room(
  2,  // location
  "Room Two", // name
  "This is Room 2. There is a carved bust on a pedestal in the corner of the room.",  // desc
  [brick],  // [items]
  [],  // [entities]
  { to: undefined, minPass: true, visible: true, blocked: false }, // N
  { to: 10, minPass: false, visible: true, blocked: false }, // NE
  { to: 1, minPass: true, visible: true, blocked: false }, // E
  { to: undefined, minPass: true, visible: true, blocked: false }, // SE
  { to: 0, minPass: true, visible: true, blocked: false }, // S
  { to: undefined, minPass: true, visible: true, blocked: false }, // SW
  { to: 3, minPass: true, visible: true, blocked: false }, // W
  { to: undefined, minPass: true, visible: true, blocked: false }, // NW
  { to: undefined, minPass: true, visible: true, blocked: false }, // UP
  { to: undefined, minPass: true, visible: true, blocked: false }, // DOWN
  { to: undefined, minPass: true, visible: true, blocked: false }, // IN
  { to: undefined, minPass: true, visible: true, blocked: false }, // OUT
  [], // action script
  [bust] // features
);
room.push(newRoom);

let sword = new Item(
  3, 
  "rusty sword",
  "This once-noble weapon was clearly the armament of a mighty warrior, but has since been laid low by the elements. It still has some heft to it, though. (And, you notice, the words 'Made in Pakistan' stamped on the pommel.",
  ["sword", "rusty"],
  10,
  "wielded",
  10
)
newRoom = new Room(
  3,  // location
  "Room Three", // name
  "This is Room 3.",  // desc
  [sword],  // [items]
  [],  // [entities]
  { to: undefined, minPass: true, visible: true, blocked: false }, // N
  { to: undefined, minPass: true, visible: true, blocked: false }, // NE
  { to: 2, minPass: true, visible: true, blocked: false }, // E
  { to: undefined, minPass: true, visible: true, blocked: false }, // SE
  { to: undefined, minPass: true, visible: true, blocked: false }, // S
  { to: undefined, minPass: true, visible: true, blocked: false }, // SW
  { to: 5, minPass: false, visible: true, blocked: false }, // W
  { to: undefined, minPass: true, visible: true, blocked: false }, // NW
  { to: undefined, minPass: true, visible: true, blocked: false }, // UP
  { to: undefined, minPass: true, visible: true, blocked: false }, // DOWN
  { to: undefined, minPass: true, visible: true, blocked: false }, // IN
  { to: undefined, minPass: true, visible: true, blocked: false }, // OUT
  [], // action script
  [] // features
);
room.push(newRoom);

newRoom = new Room(
  4,  // location
  "Room Four", // name
  "This is Room 4.",  // desc
  [],  // [items]
  [],  // [entities]
  { to: undefined, minPass: true, visible: true, blocked: false }, // N
  { to: 7, minPass: true, visible: true, blocked: false }, // NE
  { to: undefined, minPass: true, visible: true, blocked: false }, // E
  { to: undefined, minPass: true, visible: true, blocked: false }, // SE
  { to: undefined, minPass: true, visible: true, blocked: false }, // S
  { to: undefined, minPass: true, visible: true, blocked: false }, // SW
  { to: 5, minPass: true, visible: true, blocked: false }, // W
  { to: undefined, minPass: true, visible: true, blocked: false }, // NW
  { to: undefined, minPass: true, visible: true, blocked: false }, // UP
  { to: undefined, minPass: true, visible: true, blocked: false }, // DOWN
  { to: undefined, minPass: true, visible: true, blocked: false }, // IN
  { to: undefined, minPass: true, visible: true, blocked: false }, // OUT
  [], // action script
  [] // features
);
room.push(newRoom);

newRoom = new Room(
  5,  // location
  "Room Five", // name
  "This is Room 5.",  // desc
  [],  // [items]
  [],  // [entities]
  { to: undefined, minPass: true, visible: true, blocked: false }, // N
  { to: undefined, minPass: true, visible: true, blocked: false }, // NE
  { to: 4, minPass: true, visible: true, blocked: false }, // E
  { to: undefined, minPass: true, visible: true, blocked: false }, // SE
  { to: 3, minPass: false, visible: true, blocked: false }, // S
  { to: undefined, minPass: true, visible: true, blocked: false }, // SW
  { to: undefined, minPass: true, visible: true, blocked: false }, // W
  { to: undefined, minPass: true, visible: true, blocked: false }, // NW
  { to: undefined, minPass: true, visible: true, blocked: false }, // UP
  { to: undefined, minPass: true, visible: true, blocked: false }, // DOWN
  { to: undefined, minPass: true, visible: true, blocked: false }, // IN
  { to: undefined, minPass: true, visible: true, blocked: false }, // OUT
  [], // action script
  [] // features
);
room.push(newRoom);

newRoom = new Room(
  6,  // location
  "Room Six", // name
  "This is Room 6.",  // desc
  [],  // [items]
  [],  // [entities]
  { to: 8, minPass: false, visible: true, blocked: false }, // N
  { to: undefined, minPass: true, visible: true, blocked: false }, // NE
  { to: 7, minPass: true, visible: true, blocked: false }, // E
  { to: undefined, minPass: true, visible: true, blocked: false }, // SE
  { to: undefined, minPass: true, visible: true, blocked: false }, // S
  { to: undefined, minPass: true, visible: true, blocked: false }, // SW
  { to: undefined, minPass: true, visible: true, blocked: false }, // W
  { to: undefined, minPass: true, visible: true, blocked: false }, // NW
  { to: undefined, minPass: true, visible: true, blocked: false }, // UP
  { to: undefined, minPass: true, visible: true, blocked: false }, // DOWN
  { to: undefined, minPass: true, visible: true, blocked: false }, // IN
  { to: undefined, minPass: true, visible: true, blocked: false }, // OUT
  [], // action script
  [] // features
);
room.push(newRoom);

newRoom = new Room(
  7,  // location
  "Room Seven", // name
  "This is Room 7.",  // desc
  [],  // [items]
  [],  // [entities]
  { to: 8, minPass: true, visible: true, blocked: false }, // N
  { to: undefined, minPass: true, visible: true, blocked: false }, // NE
  { to: 9, minPass: false, visible: true, blocked: false }, // E
  { to: undefined, minPass: true, visible: true, blocked: false }, // SE
  { to: undefined, minPass: true, visible: true, blocked: false }, // S
  { to: 4, minPass: true, visible: true, blocked: false }, // SW
  { to: 6, minPass: true, visible: true, blocked: false }, // W
  { to: undefined, minPass: true, visible: true, blocked: false }, // NW
  { to: undefined, minPass: true, visible: true, blocked: false }, // UP
  { to: 10, minPass: true, visible: true, blocked: false }, // DOWN
  { to: undefined, minPass: true, visible: true, blocked: false }, // IN
  { to: undefined, minPass: true, visible: true, blocked: false }, // OUT
  [], // action script
  [] // features
);
room.push(newRoom);

newRoom = new Room(
  8,  // location
  "Room Eight", // name
  "This is Room 8.",  // desc
  [],  // [items]
  [],  // [entities]
  { to: undefined, minPass: true, visible: true, blocked: false }, // N
  { to: undefined, minPass: true, visible: true, blocked: false }, // NE
  { to: undefined, minPass: true, visible: true, blocked: false }, // E
  { to: undefined, minPass: true, visible: true, blocked: false }, // SE
  { to: 7, minPass: true, visible: true, blocked: false }, // S
  { to: undefined, minPass: true, visible: true, blocked: false }, // SW
  { to: 6, minPass: false, visible: true, blocked: false }, // W
  { to: undefined, minPass: true, visible: true, blocked: false }, // NW
  { to: undefined, minPass: true, visible: true, blocked: false }, // UP
  { to: undefined, minPass: true, visible: true, blocked: false }, // DOWN
  { to: undefined, minPass: true, visible: true, blocked: false }, // IN
  { to: undefined, minPass: true, visible: true, blocked: false }, // OUT
  [], // action script
  [] // features
);
room.push(newRoom);

newRoom = new Room(
  9,  // location
  "Room Nine", // name
  "This is Room 9.",  // desc
  [],  // [items]
  [],  // [entities]
  { to: undefined, minPass: true, visible: true, blocked: false }, // N
  { to: undefined, minPass: true, visible: true, blocked: false }, // NE
  { to: undefined, minPass: true, visible: true, blocked: false }, // E
  { to: undefined, minPass: true, visible: true, blocked: false }, // SE
  { to: 10, minPass: true, visible: true, blocked: false }, // S
  { to: undefined, minPass: true, visible: true, blocked: false }, // SW
  { to: 7, minPass: false, visible: true, blocked: false }, // W
  { to: undefined, minPass: true, visible: true, blocked: false }, // NW
  { to: undefined, minPass: true, visible: true, blocked: false }, // UP
  { to: undefined, minPass: true, visible: true, blocked: false }, // DOWN
  { to: undefined, minPass: true, visible: true, blocked: false }, // IN
  { to: undefined, minPass: true, visible: true, blocked: false }, // OUT
  [], // action script
  [] // features
);
room.push(newRoom);

newRoom = new Room(
  10,  // location
  "Room Ten", // name
  "This is Room 10.",  // desc
  [],  // [items]
  [],  // [entities]
  { to: 9, minPass: true, visible: true, blocked: false }, // N
  { to: undefined, minPass: true, visible: true, blocked: false }, // NE
  { to: 11, minPass: true, visible: true, blocked: false }, // E
  { to: undefined, minPass: true, visible: true, blocked: false }, // SE
  { to: undefined, minPass: true, visible: true, blocked: false }, // S
  { to: 2, minPass: false, visible: true, blocked: false }, // SW
  { to: undefined, minPass: true, visible: true, blocked: false }, // W
  { to: undefined, minPass: true, visible: true, blocked: false }, // NW
  { to: 7, minPass: true, visible: true, blocked: false }, // UP
  { to: undefined, minPass: true, visible: true, blocked: false }, // DOWN
  { to: undefined, minPass: true, visible: true, blocked: false }, // IN
  { to: undefined, minPass: true, visible: true, blocked: false }, // OUT
  [], // action script
  [] // features
);
room.push(newRoom);

newRoom = new Room(
  11,  // location
  "Room Eleven", // name
  "This is Room 11.",  // desc
  [],  // [items]
  [],  // [entities]
  { to: undefined, minPass: true, visible: true, blocked: false }, // N
  { to: undefined, minPass: true, visible: true, blocked: false }, // NE
  { to: undefined, minPass: true, visible: true, blocked: false }, // E
  { to: undefined, minPass: true, visible: true, blocked: false }, // SE
  { to: undefined, minPass: true, visible: true, blocked: false }, // S
  { to: 1, minPass: false, visible: true, blocked: false }, // SW
  { to: 10, minPass: true, visible: true, blocked: false }, // W
  { to: undefined, minPass: true, visible: true, blocked: false }, // NW
  { to: undefined, minPass: true, visible: true, blocked: false }, // UP
  { to: undefined, minPass: true, visible: true, blocked: false }, // DOWN
  { to: undefined, minPass: true, visible: true, blocked: false }, // IN
  { to: undefined, minPass: true, visible: true, blocked: false }, // OUT
  [], // action script
  [] // features
);
room.push(newRoom);

module.exports = room;


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
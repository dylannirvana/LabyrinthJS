const Room = require("./RoomConstructor.js");
const Item = require("./ItemConstructor.js");

const room = [];

// Rooms

let newRoom = new Room(
  0,  // location
  "Room Zero", // name
  "This is Room 0.",  // desc
  [],  // [items]
  [],  // [entities]
  { to: 2, minPass: true }, // N
  { to: undefined, minPass: true }, // NE
  { to: undefined, minPass: true }, // E
  { to: undefined, minPass: true }, // SE
  { to: undefined, minPass: true }, // S
  { to: undefined, minPass: true }, // SW
  { to: undefined, minPass: true }, // W
  { to: undefined, minPass: true }, // NW
  { to: undefined, minPass: true }, // UP
  { to: undefined, minPass: true }, // DOWN
  { to: undefined, minPass: true }, // IN
  { to: undefined, minPass: true }, // OUT
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
  { to: undefined, minPass: true }, // N
  { to: 11, minPass: false }, // NE
  { to: undefined, minPass: true }, // E
  { to: undefined, minPass: true }, // SE
  { to: undefined, minPass: true }, // S
  { to: undefined, minPass: true }, // SW
  { to: 2, minPass: true }, // W
  { to: undefined, minPass: true }, // NW
  { to: undefined, minPass: true }, // UP
  { to: undefined, minPass: true }, // DOWN
  { to: undefined, minPass: true }, // IN
  { to: undefined, minPass: true }, // OUT
  [], // action script
  [] // features
);
room.push(newRoom);

newRoom = new Room(
  2,  // location
  "Room Two", // name
  "This is Room 2.",  // desc
  [],  // [items]
  [],  // [entities]
  { to: undefined, minPass: true }, // N
  { to: 10, minPass: false }, // NE
  { to: 1, minPass: true }, // E
  { to: undefined, minPass: true }, // SE
  { to: 0, minPass: true }, // S
  { to: undefined, minPass: true }, // SW
  { to: 3, minPass: true }, // W
  { to: undefined, minPass: true }, // NW
  { to: undefined, minPass: true }, // UP
  { to: undefined, minPass: true }, // DOWN
  { to: undefined, minPass: true }, // IN
  { to: undefined, minPass: true }, // OUT
  [], // action script
  [] // features
);
room.push(newRoom);

newRoom = new Room(
  3,  // location
  "Room Three", // name
  "This is Room 3.",  // desc
  [],  // [items]
  [],  // [entities]
  { to: undefined, minPass: true }, // N
  { to: undefined, minPass: true }, // NE
  { to: 2, minPass: true }, // E
  { to: undefined, minPass: true }, // SE
  { to: undefined, minPass: true }, // S
  { to: undefined, minPass: true }, // SW
  { to: 5, minPass: false }, // W
  { to: undefined, minPass: true }, // NW
  { to: undefined, minPass: true }, // UP
  { to: undefined, minPass: true }, // DOWN
  { to: undefined, minPass: true }, // IN
  { to: undefined, minPass: true }, // OUT
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
  { to: undefined, minPass: true }, // N
  { to: undefined, minPass: true }, // NE
  { to: undefined, minPass: true }, // E
  { to: 7, minPass: true }, // SE
  { to: undefined, minPass: true }, // S
  { to: undefined, minPass: true }, // SW
  { to: 5, minPass: true }, // W
  { to: undefined, minPass: true }, // NW
  { to: undefined, minPass: true }, // UP
  { to: undefined, minPass: true }, // DOWN
  { to: undefined, minPass: true }, // IN
  { to: undefined, minPass: true }, // OUT
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
  { to: undefined, minPass: true }, // N
  { to: undefined, minPass: true }, // NE
  { to: 4, minPass: true }, // E
  { to: undefined, minPass: true }, // SE
  { to: 3, minPass: false }, // S
  { to: undefined, minPass: true }, // SW
  { to: undefined, minPass: true }, // W
  { to: undefined, minPass: true }, // NW
  { to: undefined, minPass: true }, // UP
  { to: undefined, minPass: true }, // DOWN
  { to: undefined, minPass: true }, // IN
  { to: undefined, minPass: true }, // OUT
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
  { to: 8, minPass: false }, // N
  { to: undefined, minPass: true }, // NE
  { to: 7, minPass: true }, // E
  { to: undefined, minPass: true }, // SE
  { to: undefined, minPass: true }, // S
  { to: undefined, minPass: true }, // SW
  { to: undefined, minPass: true }, // W
  { to: undefined, minPass: true }, // NW
  { to: undefined, minPass: true }, // UP
  { to: undefined, minPass: true }, // DOWN
  { to: undefined, minPass: true }, // IN
  { to: undefined, minPass: true }, // OUT
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
  { to: 8, minPass: true }, // N
  { to: undefined, minPass: true }, // NE
  { to: 9, minPass: false }, // E
  { to: undefined, minPass: true }, // SE
  { to: undefined, minPass: true }, // S
  { to: undefined, minPass: true }, // SW
  { to: 6, minPass: true }, // W
  { to: undefined, minPass: true }, // NW
  { to: undefined, minPass: true }, // UP
  { to: 10, minPass: true }, // DOWN
  { to: undefined, minPass: true }, // IN
  { to: undefined, minPass: true }, // OUT
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
  { to: undefined, minPass: true }, // N
  { to: undefined, minPass: true }, // NE
  { to: undefined, minPass: true }, // E
  { to: undefined, minPass: true }, // SE
  { to: 7, minPass: true }, // S
  { to: undefined, minPass: true }, // SW
  { to: 6, minPass: false }, // W
  { to: undefined, minPass: true }, // NW
  { to: undefined, minPass: true }, // UP
  { to: undefined, minPass: true }, // DOWN
  { to: undefined, minPass: true }, // IN
  { to: undefined, minPass: true }, // OUT
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
  { to: undefined, minPass: true }, // N
  { to: undefined, minPass: true }, // NE
  { to: undefined, minPass: true }, // E
  { to: undefined, minPass: true }, // SE
  { to: 10, minPass: true }, // S
  { to: undefined, minPass: true }, // SW
  { to: 7, minPass: false }, // W
  { to: undefined, minPass: true }, // NW
  { to: undefined, minPass: true }, // UP
  { to: undefined, minPass: true }, // DOWN
  { to: undefined, minPass: true }, // IN
  { to: undefined, minPass: true }, // OUT
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
  { to: 9, minPass: true }, // N
  { to: undefined, minPass: true }, // NE
  { to: 1, minPass: true }, // E
  { to: undefined, minPass: true }, // SE
  { to: undefined, minPass: true }, // S
  { to: 2, minPass: false }, // SW
  { to: undefined, minPass: true }, // W
  { to: undefined, minPass: true }, // NW
  { to: 7, minPass: true }, // UP
  { to: undefined, minPass: true }, // DOWN
  { to: undefined, minPass: true }, // IN
  { to: undefined, minPass: true }, // OUT
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
  { to: undefined, minPass: true }, // N
  { to: undefined, minPass: true }, // NE
  { to: undefined, minPass: true }, // E
  { to: undefined, minPass: true }, // SE
  { to: undefined, minPass: true }, // S
  { to: 1, minPass: false }, // SW
  { to: 10, minPass: true }, // W
  { to: undefined, minPass: true }, // NW
  { to: undefined, minPass: true }, // UP
  { to: undefined, minPass: true }, // DOWN
  { to: undefined, minPass: true }, // IN
  { to: undefined, minPass: true }, // OUT
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
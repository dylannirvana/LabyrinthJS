
// Rooms
function Room(
  location, name, desc
  ) {
  this.location = location;
  this.name = name;
  this.desc = desc;
  this.inventory = [];
  this.exits = {
    north : {
      to: false,
      minBlocked: false,
      invisible: false,
      blocked: false,
      flavor: false
    },
    northeast : {
      to: false,
      minBlocked: false,
      invisible: false,
      blocked: false,
      flavor: false
    },
    east : {
      to: false,
      minBlocked: false,
      invisible: false,
      blocked: false,
      flavor: false
    },
    southeast : {
      to: false,
      minBlocked: false,
      invisible: false,
      blocked: false,
      flavor: false
    },
    south : {
      to: false,
      minBlocked: false,
      invisible: false,
      blocked: false,
      flavor: false
    },
    southwest : {
      to: false,
      minBlocked: false,
      invisible: false,
      blocked: false,
      flavor: false
    },
    west : {
      to: false,
      minBlocked: false,
      invisible: false,
      blocked: false,
      flavor: false
    },
    northwest: {
      to: false,
      minBlocked: false,
      invisible: false,
      blocked: false,
      flavor: false
    },
    up : {
      to: false,
      minBlocked: false,
      invisible: false,
      blocked: false,
      flavor: false
    },
    down : {
      to: false,
      minBlocked: false,
      invisible: false,
      blocked: false,
      flavor: false
    },
    in : {
      to: false,
      minBlocked: false,
      invisible: false,
      blocked: false,
      flavor: false
    },
    out : {
      to: false,
      minBlocked: false,
      invisible: false,
      blocked: false,
      flavor: false
    },
  };
  this.script = [];
}

let thisRoom = new Room(
  0,
  "Room Zero",
  "This is Room 0. You shouldn't be in here. Too bad you can't get out."
);
let zero = thisRoom;

thisRoom = new Room(
  1,
  "Room One",
  "This is Room 1."
);
thisRoom.exits= {
  ...thisRoom.exits,
  northeast: { ...thisRoom.exits.northeast, to: "eleven", minBlocked: true},
  west: { ...thisRoom.exits.west, to: "two" }
};
let one = thisRoom;

thisRoom = new Room(
  2,
  "Room Two",
  "This is Room 2. A carved bust sits atop a pedestal in the corner of the room."
);
thisRoom.exits = {
  ...thisRoom.exits,
  northeast: { ...thisRoom.exits.northeast, to: "two", minBlocked: true },
  east: { ...thisRoom.exits.east, to: "one" },
  west: { ...thisRoom.exits.west, to: "three" }
};
let two = thisRoom;

thisRoom = new Room(
  3,
  "Room Three",
  "This is Room 3."
);
thisRoom.exits = {
  ...thisRoom.exits,
  east: { ...thisRoom.exits.east, to: "two" },
  west: { ...thisRoom.exits.west, to: "five", minBlocked: true }
};
let three = thisRoom;

thisRoom = new Room(
  4,
  "Room Four",
  "This is Room 4."
);
thisRoom.exits = {
  ...thisRoom.exits,
  northeast: { ...thisRoom.exits.northeast, to: "seven" },
  west: { ...thisRoom.exits.west, to: "five" }
};
let four = thisRoom;

thisRoom = new Room(
  5,
  "Room Five",
  "This is Room 5."
);
thisRoom.exits = {
  ...thisRoom.exits,
  east: { ...thisRoom.exits.east, to: "four" },
  south: { ...thisRoom.exits.south, to: "three", minBlocked: true }
};
let five = thisRoom;

thisRoom = new Room(
  6,
  "Room Six",
  "This is Room 6. The eastern wall appears to be radiating a dull sparkle."
);
thisRoom.exits = {
  ...thisRoom.exits,
  north: { to: 8, minBlocked: true },
  east: { ...thisRoom.exits.east, to: "seven", minBlocked: true, flavor: "You effortlessly pass through the wall. Cool." }
};
let six = thisRoom;

thisRoom = new Room(
  7,
  "Room Seven",
  "This is Room 7. The western wall appears to be radiating a dull sparkle. In other news, there is a thick iron gate filling the northern doorway."
);
thisRoom.exits = {
  ...thisRoom.exits,
  north: { to: 8, blocked: "You put your hand on the iron gate. Yep, it's real. And locked." },
  east: { ...thisRoom.exits.east, to: "nine", minBlocked: true },
  southwest: { ...thisRoom.exits.southwest, to: "four" },
  west: { ...thisRoom.exits.west, to: "six", minBlocked: true, flavor: "You effortlessly pass through the wall. Cool." },
  down: { ...thisRoom.exits.down, to: "ten" } 
};
let seven = thisRoom;

thisRoom = new Room(
  8,
  "Room Eight",
  "This is Room 8. There is a thick iron gate filling the southern doorway.",
);
thisRoom.exits = {
  ...thisRoom.exits,
  south: { ...thisRoom.exits.south, to: "seven", blocked: "You put your hand on the iron gate. Yep, it's real. And locked." },
  west: { ...thisRoom.exits.west, to: "six", minBlocked: true },
};
let eight = thisRoom;

thisRoom = new Room(
  9,
  "Room Nine",
  "This is Room 9."
);
thisRoom.exits = {
  ...thisRoom.exits,
  south: { ...thisRoom.exits.south, to: "ten" },
  west: { ...thisRoom.exits.west, to: "seven", minBlocked: true },
};
let nine = thisRoom;

thisRoom = new Room(
  10,
  "Room Ten",
  "This is Room 10."
);
thisRoom.exits = {
  ...thisRoom.exits,
  north: { to: "nine" }, // N
  east: { ...thisRoom.exits.east, to: "eleven" }, // E
  southwest: { ...thisRoom.exits.southwest, to: "two", minBlocked: true }, // SW
  up: { ...thisRoom.exits.up, to: "seven" }, // UP
};
let ten = thisRoom;

thisRoom = new Room(
  11,
  "Room Eleven",
  "This is Room 11. You feel a strange sense of vertigo here, almost as if you were hanging upside down."
);
thisRoom.exits = {
  ...thisRoom.exits,
  southwest: { ...thisRoom.exits.southwest, to: "one", minBlocked: true }, // SW
  west: { ...thisRoom.exits.west, to: "ten" }, // W
};
let eleven = thisRoom;

module.exports = {
  zero: zero,
  one: one,
  two: two,
  three: three,
  four: four,
  five: five,
  six: six,
  seven: seven,
  eight: eight,
  nine: nine,
  ten: ten,
  eleven: eleven
};


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
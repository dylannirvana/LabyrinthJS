const Item = require("./ItemBuilder");

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
thisRoom = {
  ...thisRoom,
  exits: {
    ...thisRoom.exits,
    northeast: { ...thisRoom.exits.northeast, to: 11, minBlocked: true},
    west: { ...thisRoom.exits.west, to: 2 }
  }
};
let one = thisRoom;

thisRoom = new Room(
  2,
  "Room Two",
  "This is Room 2. A carved bust sits atop a pedestal in the corner of the room."
);
thisRoom.exits = {
  ...thisRoom.exits,
  northeast: { ...thisRoom.exits.northeast, to: 2, minBlocked: true },
  east: { ...thisRoom.exits.east, to: 1 },
  west: { ...thisRoom.exits.west, to: 3 }
};
let two = thisRoom;

thisRoom = new Room(
  3,
  "Room Three",
  "This is Room 3."
);
thisRoom.exits = {
  ...thisRoom.exits,
  east: { ...thisRoom.exits.east, to: 2 },
  west: { ...thisRoom.exits.west, to: 5, minBlocked: true }
};
let three = thisRoom;

thisRoom = new Room(
  4,
  "Room Four",
  "This is Room 4."
);
thisRoom.exits = {
  ...thisRoom.exits,
  northeast: { ...thisRoom.exits.northeast, to: 7 },
  west: { ...thisRoom.exits.west, to: 5 }
};
let four = thisRoom;

thisRoom = new Room(
  5,
  "Room Five",
  "This is Room 5."
);
thisRoom.exits = {
  ...thisRoom.exits,
  east: { ...thisRoom.exits.east, to: 4 },
  south: { ...thisRoom.exits.south, to: 3, minBlocked: true }
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
  east: { ...thisRoom.exits.east, to: 7, minBlocked: true, flavor: "You effortlessly pass through the wall. Cool." }
};
let six = thisRoom;

thisRoom = new Room(
  7,
  "Room Seven",
  "This is Room 7. The western wall appears to be radiating a dull sparkle. In other news, there is a thick iron gate filling the southern doorway."
);
thisRoom.exits = {
  ...thisRoom.exits,
  north: { to: 8, blocked: "You put your hand on the iron gate. Yep, it's real. And locked." },
  east: { ...thisRoom.exits.east, to: 9, minBlocked: true },
  southwest: { ...thisRoom.exits.southwest, to: 4 },
  west: { ...thisRoom.exits.west, to: 6, minBlocked: true, flavor: "You effortlessly pass through the wall. Cool." },
  down: { ...thisRoom.exits.down, to: 10 } 
};
let seven = thisRoom;

thisRoom = new Room(
  8,
  "Room Eight",
  "This is Room 8. There is a thick iron gate filling the southern doorway.",
);
thisRoom.exits = {
  ...thisRoom.exits,
  south: { ...thisRoom.exits.south, to: 7, blocked: "You put your hand on the iron gate. Yep, it's real. And locked." },
  west: { ...thisRoom.exits.west, to: 6, minBlocked: true },
};
let eight = thisRoom;

thisRoom = new Room(
  9,
  "Room Nine",
  "This is Room 9."
);
thisRoom.exits = {
  ...thisRoom.exits,
  south: { ...thisRoom.exits.south, to: 10 },
  west: { ...thisRoom.exits.west, to: 7, minBlocked: true },
};
let nine = thisRoom;

thisRoom = new Room(
  10,
  "Room Ten",
  "This is Room 10."
);
thisRoom.exits = {
  ...thisRoom.exits,
  north: { to: 9 }, // N
  east: { ...thisRoom.exits.east, to: 11 }, // E
  southwest: { ...thisRoom.exits.southwest, to: 2, minBlocked: true }, // SW
  up: { ...thisRoom.exits.up, to: 7 }, // UP
};
let ten = thisRoom;

thisRoom = new Room(
  11,
  "Room Eleven",
  "This is Room 11. You feel a strange sense of vertigo here, almost as if you were hanging upside down."
);
thisRoom.exits = {
  ...thisRoom.exits,
  southwest: { ...thisRoom.exits.southwest, to: 1, minBlocked: true }, // SW
  west: { ...thisRoom.exits.west, to: 10 }, // W
};
let eleven = thisRoom;

module.exports = {
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
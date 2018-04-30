var Room = require("./RoomConstructor.js");
var Item = require("./ItemConstructor.js");

// Items

let cellPhone = new Item(
  "pack",  // location
  "cell phone",  // shortName
  "Your cell phone is a top-of-the-line Noxia Grunt 9, and has a whole ton of fun and useful apps. Too bad the battery is dead. Maybe you shouldn't have vlogged the entire Uber ride.",  // longDesc
  1,  // invSize
  false, // wear
  undefined  // value
)

// Rooms

allRooms = [];

let room0 = new Room(
  0,  // location
  "This is Room 0.",  // desc
  [],  // [items]
  [],  // [entities]
  [  //exits
    {
      north: 2,
      minPass: true
    }
  ]
);
allRooms.push(room0);

let room1 = new Room(
  1,  // location
  "This is Room 1.",  // desc
  [],  // [items]
  [],  // [entities]
  [  // [exits]
    {
      north: 10,
    },
    {
      west: 2,
      minPass: true
    }
  ]
);
allRooms.push(room0);

// module.exports = allRooms;

my_obj_instance.foo(); // => "foobar"



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
// Room Constructor
function Room(
  // arguments here
  location, name, desc, inventory, entities, N, NE, E, SE, S, SW, W, NW, UP, DOWN, IN, OUT, script, features
  ) {
  // properties here
  this.location = location;
  this.name = name;
  this.desc = desc;
  this.inventory = inventory;
  this.entities = entities;
  this.n = N;
  this.ne = NE;
  this.e = E;
  this.se = SE;
  this.s = S;
  this.sw = SW;
  this.w = W;
  this.nw = NW;
  this.up = UP;
  this.down = DOWN;
  this.in = IN;
  this.out = OUT;
  this.script = script;
  this.features = features;
}

module.exports = Room;

// // In the constructor module

  // function MyObject(bar) {
  //   this.bar = bar;
  // }

  // MyObject.prototype.foo = function foo() {
  //   console.log(this.bar);
  // };

  // module.exports = MyObject;

// // In this module:

  // var MyObjectOrSomeCleverName = require("./my_object.js");

  // var my_obj_instance = new MyObjectOrSomeCleverName("foobar");

  // my_obj_instance.foo(); // => "foobar"
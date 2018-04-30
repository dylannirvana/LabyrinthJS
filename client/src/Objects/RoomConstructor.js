// Room Constructor
function Room(
  // arguments here
  location, desc, items, entities, exits, 

) {
  // properties here
  this.location = location;
  this.desc = desc;
  this.items = items;
  this.entities = entities;
  this.exits = exits;
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
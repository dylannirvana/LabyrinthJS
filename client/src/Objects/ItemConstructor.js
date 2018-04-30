// Item Constructor
function Item(
  // arguments here
  location, shortName, longDesc, invSize, wear, value
  ) {
  // properties here
  this.location = location;
  this.shortName = shortName;
  this.longDesc = longDesc;
  this.invSize = invSize;
  this.wear = wear;
  this.value = value;
  

}

// Item.prototype.wear

module.exports = Item;

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
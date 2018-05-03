const Item = require("./ItemConstructor.js");


const item = [];

// Items

let cellPhone = new Item(
  0,  // itemId
  "cell phone",  // shortName
  "Your cell phone is a top-of-the-line Noxia Grunt 9, and has a whole ton of fun and useful apps. Too bad the battery is dead. Maybe you shouldn't have vlogged the entire Uber ride.",  // longDesc
  1,  // invSize
  false, // wear
  undefined  // value
);



module.exports = item;


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
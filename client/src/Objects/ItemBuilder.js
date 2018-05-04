const Item = require("./ItemConstructor.js");


const item = [];

const throwThis = (shortName) => {  
  return {
    actionMessage: "You hurl the "+shortName+" with all your might. It makes a satisfying crunch, but has little other effect.",
    disappears: false
  }
}
// Items

let cellphone = new Item(
  0,  // itemId

  "cell phone",  // shortName
  "cellPhone", // variableName
  "Your cell phone is a top-of-the-line Noxia Grunt 9, and has a whole ton of fun and useful apps. Too bad the battery is dead. Maybe you shouldn't have vlogged the entire Uber ride.",  // longDesc
  ["cell", "phone", "noxia", "grunt"], // keywords
  1,  // invSize
  false, // wear
  undefined,  // value
  "You hurl your cell phone across the room. It makes a satisfying crunch, but fails to do anything else." // thrown
);
item.push(cellphone);


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
// Item Constructor

function Item(
  // arguments here
  itemId, shortName, lookDesc, keywords, invSize, wear, value, thrown
  ) {
  // properties here
  this.itemId = itemId; // itemId
  this.shortName = shortName; // short name
  this.lookDesc = lookDesc; // long description
  this.keywords = keywords; // synonyms and keywords
  this.invSize = invSize;  // undefined = not takeable
  this.wear = wear; // location as string
  this.value = value; // attack or defense power
  this.thrown = "You hurl the "+shortName+" at the wall with all your might. It makes a satisfying crunch, but has little other effect." // undefined = unthrowable

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
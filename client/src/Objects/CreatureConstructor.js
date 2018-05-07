// Creature Constructor

function Creature(
  // arguments here
  location, shortName, longDesc, keywords, health, attack, defense, script, attitude, inventory
) {
  // properties here
  this.location = location; // location
  this.shortName = shortName;
  this.longDesc = longDesc;
  this.keywords = keywords;
  this.health = health;
  this.attack = attack;
  this.defense = defense;
  this.script = script;
  this.attitude = attitude;
  this.inventory = inventory;
}

module.exports = Creature;
// Creature Constructor

function Creature(
  location, shortName, lookDesc, keywords, health, attack, defense, script, attitude, doing, inventory, features
) {
  this.location = location;
  this.shortName = shortName;
  this.lookDesc = lookDesc;
  this.keywords = keywords;
  this.health = health;
  this.attack = attack;
  this.defense = defense;
  this.script = script;
  this.attitude = attitude;
  this.doing = doing;
  this.inventory = inventory;
  this.features = features;
}

module.exports = Creature;
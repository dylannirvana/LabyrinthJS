var Item = require("./ItemBuilder");
var Creature = require("./CreatureBuilder");
var Room = require("./RoomBuilder");

const newGameData = {
  moveCount: 0,
  player: {
    location: ["two"],
    equipment: {
      wielded: undefined,
      head: undefined,
      body: undefined,
      arms: undefined,
      legs: undefined
    },
    inventory: [Item.cellPhone],
    stats: {
      health: 100,
      attack: 0,
      defense: 3
    },
    options: {
      verbose: true,
    }
  },
  room: Room,
  creatures: [Creature.cat, Creature.minotaur],
  textBuffer: []
}

module.export = newGameData;
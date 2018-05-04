const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const saveStateSchema = new Schema({
  player_id: { type: [String], required: true },
  dateSaved: { type: Date, default: Date.now },
  playerLocation: { type: [Number], required: true },
  playerHealth: { type: [Number], required: true },
  playerLocation: { type: [Number], required: true },
  inventory: [],
  entities: []
});

const SaveState = mongoose.model("SaveState", saveStateSchema);

module.exports = SaveState;
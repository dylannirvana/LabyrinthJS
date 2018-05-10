import React from 'react';
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import About from "../components/About.jsx";
import Help from "../components/Help.jsx";
import Game from "../components/Game";
import Inventory from "../components/Inventory.jsx";
import Equipment from "../components/Equipment.jsx";
import Statistics from "../components/Statistics.jsx";
import { Input } from "../components/Form";

// upon mounting of game component, populate rooms, creatures, and player with items
const loadNewGame = (prevState, props) => {
  let room = require ("../Objects/RoomBuilder");
  let Items = require("../Objects/ItemBuilder");
  let Creatures = require("../Objects/CreatureBuilder");
  
  // create player inventory
  let playerInventory = [];

  // distribute items amongst player, rooms, and creatures
  for (let property in Items) {
    for (let i = 0; i < Items[property].startingLoc.length; i++) {
      if (Items[property].startingLoc[i] === "playerInventory") {
        playerInventory.push(Items[property]);
      } else {
        if (room[Items[property].startingLoc[i]]) {
          room[Items[property].startingLoc[i]].inventory.push(Items[property]);
        } else {
          if (Creatures[Items[property].startingLoc[i]]) {
            Creatures[Items[property].startingLoc[i]].inventory.push(Items[property]);
          }
        }
      } 
    }
  };
  
  // populate creature array
  let creatures = [];
  for (let property in Creatures) {
    creatures.push(Creatures[property]);
  };

  // place player
  let playerLocation = "two";

  // create initial textBuffer
  let textBuffer = [];
  textBuffer.push("Welcome to the game.");
  let firstRoom = describeRoom(playerLocation, room, creatures)
  textBuffer = textBuffer.concat(firstRoom.relay);
  textBuffer.push("Type a command to get started. Click the 'help' button for assistance with commands.");

  let thisState = { 
    ...prevState,
    playerLocation: playerLocation,
    playerInventory: playerInventory,
    room: room, 
    creatures: creatures,
    textBuffer: textBuffer,
    health: 100,
    attack: 0,
    defense: 3,
    moveCount: 0,
    wielded: undefined,
    head: undefined,
    body: undefined,
    arms: undefined,
    legs: undefined,
    options: {
      verbose: true,
    }
  };
  return thisState;
};

const updateState = (prevState, props, relay, stateChange, takesTime) => {
  let newState = {
    ...prevState,
    userCommand: "",
  };

  
  if (takesTime) {
    newState.moveCount = prevState.moveCount++;
  };
  
  // take in new relays
  let oldBuffer = prevState.textBuffer;
  relay.forEach(ele => {
    // keep textBuffer limited to 100 items
    if (oldBuffer.length > 100) oldBuffer.splice(0, 1);
    oldBuffer.push(ele);       
  });
  newState.textBuffer = oldBuffer;

  if (stateChange) {
    // update room if stateChange returns it
    if (stateChange.updateRoom) {
      // update inventory of a room
      if (stateChange.updateRoom.inventory) {
        newState.room[stateChange.updateRoom.roomLocation] = {
          ...prevState.room[stateChange.updateRoom.roomLocation],
          inventory: stateChange.updateRoom.inventory
        }
      }
    };
  
    // update player inventory if stateChange returns it
    if (stateChange.updateInventory) {
      newState.playerInventory = stateChange.playerInventory
    };
  
    // update creatures if stateChange returns it
    if (stateChange.creatures) {
      newState.creatures = stateChange.creatures.concat();
    };
    
    // update player location if stateChange returns it
    if (stateChange.playerLocation) {
      newState.playerLocation = stateChange.playerLocation;
    };
  };
  console.log("newState =", newState);
  return newState;
};

// * 
// * Dictionaries - trigger command parsing, should be reflected in switch/case
// * 

const uselessWords = [
  "the", "a", "at"
];

const generalCommands = [
  "look", "l", "wait", "z", "rest", "wait", "exa", "examine"
];

const itemCommands = [
  "take", "get", "pick", "grab", "drop", "discard", "hold"
];

const specialCommands = [
  "save", "load", "again", "g", "restore", "load", "again", "g"
];

const moveCommands = [
  "n", "ne", "e", "se", "s", "sw", "w", "nw", "north", "east", "south", "west", "northeast", "southeast", "southwest", "northwest", "go", "walk", "run", "enter", "in", "up", "u", "d", "down", "leave"
];

// 
// Parse user command
// 

const parseCommand = (commandInput, playerLocation, playerInventory, room, creatures) => {
  console.log("at start of command: room =", room);
  let data = { relay: [], stateChange: undefined, takesTime: false }
  // trim unnecessary words
  const commandWords = commandInput.trim().toLowerCase().split(" ", 8);
  if (commandWords.length === 8) {
    data.relay.push("Warning - this game is pretty dumb, and will only accept sentences of up to 8 words. It probably won't even use all eight. Look out for Version 2, coming soon!");
  };
  let command = [];
  // if (command[0] !== "g" || command[0] !== "again") {async (commandInput) => {await this.setState({ lastCommand: commandInput })}};
  commandWords.forEach(ele => {if (!uselessWords.includes(ele)) command.push(ele)});
  //check for move command
  if (moveCommands.indexOf(command[0]) !== -1) {
    let data = movePlayer(command, playerLocation, playerInventory, room, creatures);
    console.log("outgoing data from movePlayer() => parseCommand() = ", data);
    return data;
  }
  else if (specialCommands.indexOf(command[0]) !== -1) {
    let data = specialAction(command, playerLocation, playerInventory, room, creatures);
    console.log("outgoing data from specialCommands() => parseCommand() =", data);
    return data;
  }
  else if (itemCommands.indexOf(command[0]) !== -1) {
    let data = itemAction(command, playerLocation, playerInventory, room, creatures);
    console.log("outgoing data from itemCommands() => parseCommand() =", data);
    return data;
  }
  else if (generalCommands.indexOf(command[0]) !== -1) {
    let data = generalAction(command, playerLocation, playerInventory, room, creatures);
    console.log("outgoing data from generalCommands() => parseCommand() =", data);
    return data;
  }
  console.log("parseCommand() error, command ="+command.join(", "));
  return { relay : "SYSTEM: Unknown command. - in parseCommand(), command = "+command.join(", ") };
};
 
// * 
// * Advance game time, resolve entity action
// *

// const advanceTurn = (creatures, player) => {
//   let result = {
//     relay: []
//   }
//   creatures.forEach((ele) => {
//     if (ele.script.length) {
//       // do first item in script array
//     }
//   })
//   return result;
// };


// *
// * Turn handling for Creatures
// *

const advanceTurn = (creatures, playerLocation, room) => {
  for (let i = 0; i < creatures.length; i++) {
    // check if there is an action queued in Creature's script array
    let creatureIndex = i;
    let thisCreature = creatures[i].shortName;
    if (creatures[i].script.length) {
      // console.log(thisCreature+"'s location before move = "+creatures[i].location);
      // console.log("room =", room[ele.location]);
      switch (creatures[i].script[0]) {
        case "moveRandom" : 
          let exits = [];
          // console.log("Creature =", creatures[i].shortName, ", location =", creatures[i].location);
          let thisRoom = room[creatures[i].location].exits;
          // console.log("thisRoom =", thisRoom);
          if (thisRoom.north && thisRoom.north.visible && !thisRoom.north.blocked && ((thisCreature !== "Minotaur" || thisRoom.north.minPass))) {exits.push(thisRoom.north.to)};
          if (thisRoom.northeast && thisRoom.northeast.visible && !thisRoom.northeast.blocked && ((thisCreature !== "Minotaur" || thisRoom.northeast.minPass))) {exits.push(thisRoom.northeast.to)};
          if (thisRoom.east && thisRoom.east.visible && !thisRoom.east.blocked && (thisCreature !== "Minotaur" || thisRoom.east.minPass)) {exits.push(thisRoom.east.to)};
          if (thisRoom.southeast && thisRoom.southeast.visible && !thisRoom.southeast.blocked && ((thisCreature !== "Minotaur" || thisRoom.southeast.minPass))) {exits.push(thisRoom.southeast.to)};
          if (thisRoom.south && thisRoom.south.visible && !thisRoom.south.blocked && ((thisCreature !== "Minotaur" || thisRoom.south.minPass))) {exits.push(thisRoom.south.to)};
          if (thisRoom.southwest && thisRoom.southwest.visible && !thisRoom.southwest.blocked && ((thisCreature !== "Minotaur" || thisRoom.southwest.minPass))) {exits.push(thisRoom.southwest.to)};
          if (thisRoom.west && thisRoom.west.visible && !thisRoom.west.blocked && ((thisCreature !== "Minotaur" || thisRoom.west.minPass))) {exits.push(thisRoom.west.to)};
          if (thisRoom.northwest && thisRoom.northwest.visible && !thisRoom.northwest.blocked && ((thisCreature !== "Minotaur" || thisRoom.northwest.minPass))) {exits.push(thisRoom.northwest.to)};
          if (thisRoom.up && thisRoom.up.visible && !thisRoom.up.blocked && ((thisCreature !== "Minotaur" || thisRoom.up.minPass))) {exits.push(thisRoom.up.to)};
          if (thisRoom.down && thisRoom.down.visible && !thisRoom.down.blocked && ((thisCreature !== "Minotaur" || thisRoom.down.minPass))) {exits.push(thisRoom.down.to)};
          if (thisRoom.in && thisRoom.in.visible && !thisRoom.in.blocked && ((thisCreature !== "Minotaur" || thisRoom.in.minPass))) {exits.push(thisRoom.in.to)};
          if (thisRoom.out && thisRoom.out.visible && !thisRoom.out.blocked && ((thisCreature !== "Minotaur" || thisRoom.out.minPass))) {exits.push(thisRoom.out.to)};
          let roll = Math.floor(Math.random() * Math.floor(100));
          // console.log("exits =", exits);
          if (roll <= 20) {
            // console.log("staying put, roll =", roll);
            // creature stays put
          } else {
            for (let i = 0 ; i < exits.length; i++) {
              if (roll <= 20 + (i+1) * (80 / exits.length)) {
                console.log(thisCreature+"'s location after move = "+exits[i]+" ; roll = ", roll);
                this.echo(["The creature walks to another room."], "noTime");
                creatures[creatureIndex].location = exits[i];
                break;
              }
            }
          }
          break;
        case "chase" :
          break;
        case "search" :
          break;
        case "blinded" :
          break;
        default: 
          console.log("advanceTurn() defaulted for "+thisCreature);
          return { relay: "advanceTurn() defaulted for "+thisCreature }; 
      }
    }
  }
  console.log("Outgoing creatures from advanceTurn() =", creatures);
  return { stateChange: { creatures: creatures.concat() }};
};

// *
// * Move actions
// *

const movePlayer = (words, playerLocation, playerInventory, room, creatures) => {
  let data = { relay: [], stateChange: undefined, takesTime: false };
  if ((words[0] === "go" || words[0] === "walk" ||words[0] === "run")) {words.shift()};
  if ((words[0] === "n" || words[0] === "north") && (words[1] === "e" || words[1] === "east")) {words[0] = "northeast"};
  if ((words[0] === "n" || words[0] === "north") && (words[1] === "w" || words[1] === "west")) {words[0] = "northwest"};
  if ((words[0] === "s" || words[0] === "south") && (words[1] === "e" || words[1] === "east")) {words[0] = "southeast"};
  if ((words[0] === "s" || words[0] === "south") && (words[1] === "w" || words[1] === "west")) {words[0] = "southwest"};
  let word = words[0];
  switch (word) {
    case "n" : case "north" : word = "north"; break;
    case "ne" : case "northeast" : word = "northeast"; break;
    case "e" : case "east" : word = "east"; break;
    case "se" : case "southeast" : word = "southeast"; break;
    case "s" : case "south" : word = "south"; break;
    case "sw" : case "southwest" : word = "southwest"; break;
    case "w" : case "west" : word = "west"; break;
    case "nw" : case "northwest" : word = "northwest"; break;
    case "u" : case "up" : word = "up"; break;
    case "d" : case "down" : word = "down"; break;
    case "in" : case "into" : word = "in"; break;
    case "leave" : case "out" : word = "out"; break;
    default : data.relay.push("SYSTEM: Movement not defined. - at movePlayer(), words[0] = '"+words[0]+"'"); console.log("Movement not defined at movePlayer()");
  }
  if (room[playerLocation].exits[word].to) {
    let result = move("player", room[playerLocation].exits[word]);
    data.relay = data.relay.concat(result.relay);
    if (result.pass) {
      let roomDesc = describeRoom(result.newLoc, room, creatures);
      data.relay = data.relay.concat(roomDesc.relay);
      if (result.takesTime) {
        data.takesTime = true;
      }
      data.stateChange = {
        playerLocation: result.newLoc
      }
    };
  } else data.relay.push("You can't go that way.");
  console.log("outgoing data from movePlayer() =", data);
  return data;
};

// Determines if a move direction works out
const move = (who, doorway) => {
  console.log("data coming into move(), who =", who, "  doorway =", doorway);
  let data = { relay: [], stateChange: undefined, takesTime: false };
  let pass = false;
  // check if wall is invisible
  if (doorway.invisible && who.dumb ) {
    data.relay.push("The "+who.shortName+" doesn't seem to realize it can go there.") 
  } else
  // check if blocking Minotaur
  if (!(who.shortName !== "Minotaur" || !doorway.minBlocked)) {
    data.relay.push("The Minotaur can't quite fit through the exit, and roars in frustration.");
    console.log("Minotaur can't pass through doorway to "+doorway+".");
  } else
  // check if doorway blocked
  if (doorway.blocked) {
    data.relay.push(doorway.blocked);
  } else {
    // the entity can successfully pass
    data.pass = true;
    // check for flavor text
    if (doorway.flavor) {
      data.relay.push(doorway.flavor);
    } 
    data.newLoc = doorway.to
  }
  console.log("outgoing data from move() =", data);
  return data;
};

// relay description of room and any present items, creatures, and exits
const describeRoom = (playerLocation, room, creatures) => {
  let data = { relay: [], stateChange: undefined, takesTime: false };
  // add room name to echo relay
  data.relay.push(room[playerLocation].name);
  // add room description to echo relay
  data.relay.push(room[playerLocation].desc);
  // add creatures present to echo relay
  creatures.forEach((ele, i) => {
    if (ele.location === playerLocation) {
      let thisCreature="There is a ";
      thisCreature+=ele.shortName;
      thisCreature+=ele.doing;
      data.relay.push(thisCreature);
    }
  })
  // add room inventory contents to relay
  if (room[playerLocation].inventory.filter(item => !item.feature)) {
    let items = [];
    for (let i = 0; i < room[playerLocation].inventory.length; i++) {
      if (room[playerLocation].inventory[i].feature) {
        // skip item, because it's a feature
      } else {
        items.push("a "+room[playerLocation].inventory[i].shortName);
      }
    }
    if (items.length === 1) {
      data.relay.push("You see "+items+" here.");
    } else {
      data.relay.push([items.slice(0, -1).join(', '), items.slice(-1)[0]].join(items.length < 2 ? '' : ' and '));
    }
  }

  // add exits to relay
  let exits =[];
  if (room[playerLocation].exits.north.to) {
    if (!room[playerLocation].exits.north.invisible) {
      exits.push("north");
    }
  };
  if (room[playerLocation].exits.northeast.to) {
    if (!room[playerLocation].exits.northeast.invisible) {
      exits.push("northeast");
    }
  };
  if (room[playerLocation].exits.east.to) {
    if (!room[playerLocation].exits.east.invisible) {
      exits.push("east");
    }
  };
  if (room[playerLocation].exits.southeast.to) {
    if (!room[playerLocation].exits.southeast.invisible) {
      exits.push("southeast");
    }
  };
  if (room[playerLocation].exits.south.to) {
    if (!room[playerLocation].exits.south.invisible) {
      exits.push("south");
    }
  };
  if (room[playerLocation].exits.southwest.to) {
    if (!room[playerLocation].exits.southwest.invisible) {
      exits.push("southwest");
    }
  };
  if (room[playerLocation].exits.west.to) {
    if (!room[playerLocation].exits.west.invisible) {
      exits.push("west");
    }
  };
  if (room[playerLocation].exits.northwest.to) {
    if (!room[playerLocation].exits.northwest.invisible) {
      exits.push("northwest");
    }
  };
  if (room[playerLocation].exits.up.to) {
    if (!room[playerLocation].exits.up.invisible) {
      exits.push("up");
    }
  };
  if (room[playerLocation].exits.down.to) {
    if (!room[playerLocation].exits.down.invisible) {
      exits.push("down");
    }
  };
  if (room[playerLocation].exits.in.to) {
    if (!room[playerLocation].exits.in.invisible) {
      exits.push("in");
    }
  };
  if (room[playerLocation].exits.out.to) {
    if (!room[playerLocation].exits.out.invisible) {
      exits.push("out");
    }
  };

  data.relay.push("Exits: "+exits.join(", "));
  // echo 
  console.log("outgoing data from describeRoom() =", data);
  return data;
}

// *
// * Special actions
// *

const specialAction = (words, playerLocation, playerInventory, roomInventory, creatures) => {
  let result;
  switch (words[0]) {
    case "again" : case "g" : 
      console.log("Work out method for 'again'")
      // old attempt, needs refactoring
      // if (this.state.lastCommand) {
      //   response = () => this.parseCommand(this.state.lastCommand)
      // } else {
      //   response = () => this.echo(["What do you want to do again?"], "noTime")
      // }; 
      break;
    default : 
      result.relay = ["SYSTEM: Command not defined. - at specialAction(), words = '"+words.join(", ")];
      console.log("Command not defined at specialAction()")
    
  }
  let data = { relay: [], stateChange: undefined, takesTime: false };
  if (result.relay.length) {data.relay = data.relay.concat(result.relay)};
  if (result.takesTime) {data.takesTime = true};
  if (result.stateChange) {data.stateChange = result.stateChange};
  console.log("outgoing data from specialAction() =", data);
  return data;
}

// *
// * Item actions
// *

const itemAction = (words, playerLocation, playerInventory, room, creatures) => {
  let result;
  let data = { relay: [], stateChange: undefined, takesTime: false };
  switch (words[0]) {
    case "take" : case "get" : case "pick" : case "grab" : {
      result = takeItem(words[1], playerLocation, playerInventory, room, creatures); break;
    }
    case "drop" : case "discard" : {
      result = dropItem(words[1], playerLocation, playerInventory, room, creatures); break;
    }
    default : 
      result.relay.push("SYSTEM: Command not defined. - at itemAction(), words = '"+words.join(", "));
    console.log("Command not defined at itemAction()");
  }
  if (result.relay) {data.relay = data.relay.concat(result.relay)};
  if (result.takesTime) {data.takesTime = true};
  if (result.stateChange) {data.stateChange = result.stateChange};
  console.log("outgoing data from itemAction() =", data);
  return data;
}

const takeItem = (word, playerLocation, playerInventory, room, creatures) => {
  let data = { relay: [], stateChange: undefined, takesTime: false };
  if (word === "all" || word === "everything") {
    if (room[playerLocation].inventory.filter(item => !item.feature)) {
      playerInventory = playerInventory.concat(room[playerLocation].inventory.filter(item => !item.feature));
      console.log("inventory before stateChange =", playerInventory);
      console.log("after take: room =", room);
      data.relay.push("You pick up everything that's not nailed down.");
      data.takesTime = true;
      data.stateChange = {
        playerInventory: playerInventory,
        updateRoom: { 
          roomLocation: playerLocation,
          inventory: room[playerLocation].inventory.filter(item => item.feature)
        }
      }
      console.log("outgoing data from successful takeItem('all') =", data);
      return data;
    } else {
      data.relay.push("You don't see anything you can take.");
      console.log("takeItem(all) couldn't find anything. outgoing data =", data);
      return data;
    }
  } else {
    for (let i = 0; i < room[playerLocation].inventory.length; i++) {
      if (room[playerLocation].inventory[i].keywords.includes(word)) {
        if (room[playerLocation].inventory[i].feature) {
          data.relay.push("You can't take that.");
          console.log("takeItem(word) couldn't take that. outgoing data =", data);
          return data;
        }
        let found = room[playerLocation].inventory[i].shortName;
        let item = room[playerLocation].inventory.splice(i, 1);
        playerInventory = playerInventory.concat(item);
        data.relay.push("You pick up the "+found+".");
        data.takesTime = true;
        data.stateChange = {
          playerInventory: playerInventory,
          updateRoom: { 
            roomLocation: playerLocation,
            inventory: room[playerLocation].inventory,
          }
        }
      };
      console.log("Item picked up in takeItem(word). outgoing data =", data);
      return data;
    }
  }
  for (let i = 0; i < playerInventory.length; i++) {
    if (playerInventory[i].keywords.includes(word)) {
      data.relay.push("You already have that!");
      console.log("Item already in inventory in takeItem(word). outgoing data =", data);
      return data;
    }
  }
  for (let i = 0; i < creatures.length; i++) {
    if (creatures[i].location === playerLocation) {
      if (creatures[i].keywords.includes(word)) {
        data.relay.push("I don't think they would like that.");
        console.log("Tried to take a creature in takeItem(word). outgoing data =", data);
        return data;
      }
    }
  }
  console.log("Looked for "+word+" and failed.");
  data.relay.push("You don't see that here.");
  console.log("Failed to find item in takeItem(word). outgoing data =", data);
  return data;
};

const dropItem = (word, playerLocation, playerInventory, room, creatures) => {
  let data = { relay: [], stateChange: undefined, takesTime: false };
  if (!playerInventory.length) {
    data.relay.push("You aren't carrying anything!");
    console.log("Tried to drop from empty inv in dropItem(all). outgoing data =", data);
    return data;
  }
  if (word === "all" || word === "everything") {
    if (playerInventory.length) {
      room[playerLocation].inventory = room[playerLocation].inventory.concat(playerInventory);
      data.relay.push("You drop everything you're carrying.");
      data.takesTime = true;
      data.stateChange = {
        playerInventory: [],
        updateRoom: { 
          roomLocation: playerLocation,
          inventory: room[playerLocation].inventory 
        }
      }
    }
    console.log("Dropped all items in dropItem(all). outgoing data =", data);
    return data;
  }
  for (let i = 0; i < playerInventory.length; i++) {
    if (playerInventory[i].keywords.includes(word)) {
      let found = playerInventory[i].shortName;
      let item = playerInventory.splice(i, 1)
      room[playerLocation].inventory.push(item);
      data.relay.push("You drop the "+found+".");
      data.takesTime = true;
      data.stateChange = {
        playerInventory: playerInventory,
        updateRoom: { 
          roomLocation: playerLocation,
          inventory: room[playerLocation].inventory,
        }
      }
    }
    console.log("item dropped in dropItem(word). outgoing data =", data);
    return data;
  };
  data.relay.push("You don't have that.");
  console.log("Couldn't drop '"+word+"' in dropItem(word). outgoing data =", data);
  return data;
};

// *
// * General actions
// *

const generalAction = (words, playerLocation, playerInventory, room, creatures) => {
  let data = { relay: [], stateChange: undefined, takesTime: false };
  switch (words[0]) {
    case "l" : case "look" : case "exa" : case "examine" :
      data = examine(words, playerLocation, playerInventory, room, creatures); break;
    case "z" : case "rest" : case "wait" :
      data.relay.push("You chill for a minute. It's been a tough day, and you've earned it."); 
      data.takesTime = true; break;
    default : 
      console.log("Command not defined at generalAction()");
      data.relay.push("SYSTEM: Command not defined. - at generalAction(), words = "+words.join(", "));
  }
  console.log("Outgoing data from generalAction =", data);
  return data;
}

// Examine/Look action command
const examine = (words, playerLocation, playerInventory, room, creatures) => {
  let data = { relay: [], stateChange: undefined, takesTime: false };
  if (words.length === 1 || words[1] === "room" || words[1] === "around") {
    let result = describeRoom(playerLocation, room, creatures);
    data.relay = data.relay.concat(result.relay);
    console.log("Examining room in examine(word). outgoing data =", data);
    return data;
  }
  // check if player is a narcissist
  if (words[1] === "me" || words[1] === "myself") {
    // if (isMobile) this.viewCharacterToggle()} 
    data.relay.push("You fine specimen, you.");
    console.log("Looking at self in dropItem(word). outgoing data =", data);
    return data;
  }
  // check player inventory if object not yet found
  for (let i = 0; i < playerInventory.length; i++) {
    if (playerInventory[i].keywords.includes(words[1])) {
      data.relay.push(playerInventory[i].lookDesc);
      console.log("Found '"+words[1]+"' in playerInv in examine(word). outgoing data =", data);
      return data;
    }
  }
  // check room inventory if object not yet found
  // console.log("examine =", location.inventory);
  for (let i = 0; i < room[playerLocation].inventory.length; i++) {
    if (room[playerLocation].inventory[i].keywords.includes(words[1])) {
      data.relay.push(room[playerLocation].inventory[i].lookDesc);
      console.log("Found '"+words[1]+"' in roomInv in examine(word). outgoing data =", data);
      return data;
    }
  }
  // check present creatures if object not yet found
  for (let i = 0; i < creatures.length; i++) {
    if (creatures[i].location === playerLocation) {
      if (creatures[i].keywords.includes(words[1])) {
        data.relay.push(creatures[i].lookDesc);
        console.log("Found '"+words[1]+"' in creature array in examine(word). outgoing data =", data);
        return data;
      }
    }
  }
  // check present creature features (in creature inventory) if object not yet found
  for (let i = 0; i < creatures.length; i++) {
    if (creatures[i].location === playerLocation) {
      for (let j = 0; j < creatures[i].inventory.length; j++) {
        if (creatures[i].inventory[j].keywords.includes([words[1]])) {
          data.relay.push(creatures[i].inventory[j].lookDesc);
          console.log("Found '"+words[1]+"' in creatureInv in examine(word). outgoing data =", data);
          return data;
        }
      }
    }
  }
  data.relay.push("You don't see that here.");
  console.log("Tried to examine something and didn't find it, in examine(word). outgoing data =", data);
  return data;
}

// * 
// * Creature Script Items
// * 

// moves creature in a random direction, maybe
// const wander = (creature, thisRoom, playerLocation) => {
//   let exits = [];
//   if (thisRoom.n.to && thisRoom.n.visible && !thisRoom.n.blocked && ((thisCreature !== "Minotaur" || thisRoom.n.minPass))) {
//     exits.push({
//       newLoc: thisRoom.n.to,
//       dir: "north"
//     })
//   };
//   if (thisRoom.ne.to && thisRoom.ne.visible && !thisRoom.ne.blocked && ((thisCreature !== "Minotaur" || thisRoom.ne.minPass))) {
//     exits.push({
//       newLoc: thisRoom.ne.to,
//       dir: "northeast"
//     })
//   };
//   if (thisRoom.e.to && thisRoom.e.visible && !thisRoom.e.blocked && (thisCreature !== "Minotaur" || thisRoom.e.minPass)) {
//     exits.push({
//       newLoc: thisRoom.e.to,
//       dir: "east"
//     })
//   };
//   if (thisRoom.se.to && thisRoom.se.visible && !thisRoom.se.blocked && ((thisCreature !== "Minotaur" || thisRoom.se.minPass))) {
//     exits.push({
//       newLoc: thisRoom.se.to,
//       dir: "southeast"
//     })
//   };
//   if (thisRoom.s.to && thisRoom.s.visible && !thisRoom.s.blocked && ((thisCreature !== "Minotaur" || thisRoom.s.minPass))) {
//     exits.push({
//       newLoc: thisRoom.s.to,
//       dir: "south"
//     })
//   };
//   if (thisRoom.sw.to && thisRoom.sw.visible && !thisRoom.sw.blocked && ((thisCreature !== "Minotaur" || thisRoom.sw.minPass))) {
//     exits.push({
//       newLoc: thisRoom.sw.to,
//       dir: "southwest"
//     })
//   };
//   if (thisRoom.w.to && thisRoom.w.visible && !thisRoom.w.blocked && ((thisCreature !== "Minotaur" || thisRoom.w.minPass))) {
//     exits.push(thisRoom.w.to)};
//   if (thisRoom.nw.to && thisRoom.nw.visible && !thisRoom.nw.blocked && ((thisCreature !== "Minotaur" || thisRoom.nw.minPass))) {
//     exits.push(thisRoom.nw.to)};
//   if (thisRoom.up.to && thisRoom.up.visible && !thisRoom.up.blocked && ((thisCreature !== "Minotaur" || thisRoom.up.minPass))) {
//     exits.push(thisRoom.up.to)};
//   if (thisRoom.down.to && thisRoom.down.visible && !thisRoom.down.blocked && ((thisCreature !== "Minotaur" || thisRoom.down.minPass))) {
//     exits.push(thisRoom.down.to)};
//   if (thisRoom.in.to && thisRoom.in.visible && !thisRoom.in.blocked && ((thisCreature !== "Minotaur" || thisRoom.in.minPass))) {
//     exits.push(thisRoom.in.to)};
//   if (thisRoom.out.to && thisRoom.out.visible && !thisRoom.out.blocked && ((thisCreature !== "Minotaur" || thisRoom.out.minPass))) {
//     exits.push(thisRoom.out.to)};
//   let roll = Math.floor(Math.random() * Math.floor(100));
//   console.log("exits =", exits);
//   if (roll <= 20) {
//     console.log("staying put, roll =", roll);
//     // creature stays put
//   } else {
//     for (let i = 0 ; i < exits.length; i++) {
//       if (roll <= 20 + (i+1) * (80 / exits.length)) {
//         console.log(thisCreature+"'s location after move = "+exits[i]+" ; roll = ", roll);
//         this.echo(["The creature walks to another room."], "noTime");
//         creatures[creatureIndex].location = exits[i];
//         const newState = {
//           location: exits[i]
//         }
//         break;
//       }
//       if (playerLocation === thisRoom.location) {
//         // do stuff to relay creature activity here
//       }
//     }
//   }

//   return 
// };

// * 
// * Utilities
// * 

// Keeps roomDesc window scrolled to bottom
const updateScroll = () => {
  var element = document.getElementById("roomDesc");
  element.scrollTop = element.scrollHeight;
};

// checks if being viewed in mobile layout
let isMobile = window.innerWidth < 768 ? true : false;

class GamePage extends React.Component {

  componentDidMount() {

    // update authenticated state on logout
    this.props.toggleAuthenticateStatus();

    this.setState((prevState, props) => loadNewGame(prevState, props))

  }

  state = {
    userCommand: "",
    lastCommand: "",
    inProgress: true,
    authenticated: false,
    viewCharacter: false,
    viewAbout: false,
    viewHelp: false,
    isMobile: isMobile,
    // below loaded in loadNewGame()
    playerLocation: "two",
    playerInventory: [],
    room: {}, 
    creatures: [],
    textBuffer: [],
    health: 100,
    attack: 0,
    defense: 3,
    moveCount: 0,
    wielded: undefined,
    head: undefined,
    body: undefined,
    arms: undefined,
    legs: undefined,
    options: {
      verbose: true,
    }
  };

  handleUserCommand = this.handleUserCommand.bind(this);  

  // *
  // * HANDLE PLAYER COMMAND INPUT
  // *

  handleInputChange = event => {
    this.setState({ userCommand: event.target.value });
  };

  async handleUserCommand(event) {
    event.preventDefault();
    // check for non-empty command input
    if (this.state.userCommand) {
      let moveCount = this.state.moveCount;
      let playerLocation = this.state.playerLocation;
      let playerInventory = this.state.playerInventory.concat();
      let creatures = this.state.creatures.concat();
      let room = this.state.room;
      let relay = [];
      let stateChange = {};
      console.log("in handlecommand: room =", room);
      console.log("in handlecommand: room[2] =", room[2]);
      // add user command to relay
      relay.push("> "+this.state.userCommand);
      // start command processing here
      let result = parseCommand(this.state.userCommand, playerLocation, playerInventory, room, creatures);
      if (result.relay) {
        relay = relay.concat(result.relay);
      };
      // advance game time, resolve entity action
      let takesTime = false;
      if (result.takesTime) {
        let newTurnResults = advanceTurn(creatures, playerLocation, room);
        console.log("newTurnResults =", newTurnResults);
        relay = relay.concat(newTurnResults.relay)
        takesTime = true;
      }
      await this.setState((prevState, props) => (updateState(prevState, props, relay, result.stateChange, takesTime)));
      // assure roomDesc window is scrolled to bottom
      updateScroll();
    }
  }
  // *
  // * BUTTON HANDLING
  // *

  viewCharacterToggle = () => {
    this.setState({viewCharacter: !this.state.viewCharacter});
  }

  viewAboutToggle = () => {
    this.setState({viewAbout: !this.state.viewAbout});
  }

  viewHelpToggle = () => {
    this.setState({viewHelp: !this.state.viewHelp});
  }

  handleSaveButton = data => {
    console.log("Save button firing");
    // API.saveState({
    //   id: data.id,
    //   headline: data.headline,
    //   snippet: data.snippet,
    //   datePublished: data.date,
    //   url: data.url
    // })
    //   .then(res => console.log(res))
    //   .catch(err => console.log(err))
    // ;
  };
  
  render() {

    return (
      <div>
        <Modal isOpen={this.state.viewCharacter} toggle={this.viewCharacterToggle} className="characterModal">
          <ModalHeader toggle={this.viewCharacterToggle}>You</ModalHeader>
          <ModalBody>
            <Statistics 
              health={this.state.health}
              attack={this.state.attack} 
              defense={this.state.defense} 
              moveCount={this.state.moveCount}
            />
            <Equipment 
              wielded={this.state.wielded} 
              head={this.state.head} 
              body={this.state.body} 
              arms={this.state.arms} 
              legs={this.state.legs} 
            />
            <Inventory inventory={this.state.playerInventory}/>
          </ModalBody>
        </Modal>
        <About 
          viewAbout={this.state.viewAbout}viewAboutToggle={this.viewAboutToggle.bind(this)} />
        <Help 
          viewHelp={this.state.viewHelp} viewHelpToggle={this.viewHelpToggle.bind(this)}/>
        <Game 
          currentState={this.state} 
          viewAboutToggle={this.viewAboutToggle.bind(this)}
          viewHelpToggle={this.viewHelpToggle.bind(this)}
          viewCharacterToggle={this.viewCharacterToggle.bind(this)}
          handleLoginButton={this.handleLoginButton}  
          handleSaveButton={this.handleSaveButton}
          handleQuitButton={this.props.handleQuitButton}>
          <form className="userCommandLine">
            <div className="form-group">
              <label>>&nbsp;</label>
              <Input
                value={this.state.userCommand}
                onChange={this.handleInputChange}
                name="userCommand"
                type="text"
                id="command"
                data-lpignore="true"
                autoComplete="off"
                onClick={(e) => {this.handleUserCommand(e)}} 
              />
              <button type="submit" onClick={(e) => {this.handleUserCommand(e)}} className="btn btn-success d-none">Submit</button>
            </div>
          </form>
        </Game>
      </div>
    )

    // original boilerplate
    // return (
    //   <Card className="container">
    //     <CardTitle title="React Application" subtitle="This is the home page." />
    //       {Auth.isUserAuthenticated() ? (
    //         <CardText style={{ fontSize: '16px', color: 'green' }}>Welcome! You are logged in.</CardText>
    //       ) : (
    //         <CardText style={{ fontSize: '16px', color: 'green' }}>You are not logged in.</CardText>
    //       )}
    //   </Card>
    // )
    // end original boilerplate
  }
};

export default GamePage;

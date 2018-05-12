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
  let creature = require("../Objects/CreatureBuilder");
  
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
          if (creature[Items[property].startingLoc[i]]) {
            creature[Items[property].startingLoc[i]].inventory.push(Items[property]);
          }
        }
      } 
    }
  };

  // place player
  let playerLocation = "two";

  // create initial textBuffer
  let textBuffer = [];
  textBuffer.push("Welcome to the game.");
  let firstRoom = describeRoom(playerLocation, room, creature, { relay: [] })
  textBuffer = textBuffer.concat(firstRoom.relay);
  textBuffer.push("Type a command to get started. Click the 'help' button for assistance with commands.");

  let thisState = { 
    ...prevState,
    playerLocation: playerLocation,
    playerInventory: playerInventory,
    room: room, 
    creature: creature,
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

const updateState = (prevState, props, currData) => {
  let newState = {
    ...prevState,
    userCommand: "",
  };
  console.log("updateState() receiving currData =", currData);

  
  if (currData.takesTime) {
    newState.moveCount = prevState.moveCount++;
  };
  
  // take in new relays
  let oldBuffer = prevState.textBuffer;
  currData.relay.forEach(ele => {
    // keep textBuffer limited to 100 items
    if (oldBuffer.length > 100) oldBuffer.splice(0, 1);
    oldBuffer.push(ele);       
  });
  newState.textBuffer = oldBuffer;

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

// *
// * Parse user command
// *

const parseCommand = (commandInput, playerLocation, playerInventory, room, creature, currData) => {
  // console.log("*** at start of command: room =", room);
  // trim unnecessary words
  const commandWords = commandInput.trim().toLowerCase().split(" ", 8);
  if (commandWords.length === 8) {
    currData.relay.push("Warning - this game is pretty dumb, and will only accept sentences of up to 8 words. It probably won't even use all eight. Look out for Version 2, coming soon!");
  };
  let command = [];
  // if (command[0] !== "g" || command[0] !== "again") {async (commandInput) => {await this.setState({ lastCommand: commandInput })}};
  commandWords.forEach(ele => {if (!uselessWords.includes(ele)) command.push(ele)});
  //check for move command
  if (moveCommands.indexOf(command[0]) !== -1) {
    currData = movePlayer(command, playerLocation, playerInventory, room, creature, currData);
    console.log("outgoing data from movePlayer() => parseCommand() = ", currData);
    return currData;
  }
  else if (specialCommands.indexOf(command[0]) !== -1) {
    currData = specialAction(command, playerLocation, playerInventory, room, creature, currData);
    console.log("outgoing data from specialCommands() => parseCommand() =", currData);
    return currData;
  }
  else if (itemCommands.indexOf(command[0]) !== -1) {
    currData = itemAction(command, playerLocation, playerInventory, room, creature, currData);
    console.log("outgoing data from itemCommands() => parseCommand() =", currData);
    return currData;
  }
  else if (generalCommands.indexOf(command[0]) !== -1) {
    currData = generalAction(command, playerLocation, playerInventory, room, creature, currData);
    console.log("outgoing data from generalCommands() => parseCommand() =", currData);
    return currData;
  }
  console.log("parseCommand() error, command ="+command.join(", "));
  currData.relay.push("SYSTEM: Unknown command. - in parseCommand(), command = "+command.join(", "));
  return currData;
};

// integrateStateChange
const integrateStateChange = (currData, newStateChange) => {
  console.log("integrateStateChange() firing, currData =", currData);
  console.log("integrateStateChange() firing, newStateChange =", newStateChange);
  for (let property in newStateChange) {

  }

  return currData;
  console.log("addData() finishing, returning data =", currData);
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

const advanceTurn = (creature, playerLocation, room, currData) => {
  for (let thisCreature in creature) {
    console.log("thisCreature =", thisCreature);
    // check if there is an action queued in Creature's script array
    if (creature[thisCreature].script.length) {
      // console.log(thisCreature+"'s location before move = "+creatures[i].location);
      // console.log("room =", room[ele.location]);
      switch (creature[thisCreature].script[0]) {
        case "moveRandom" : 
          let exits = [];
          // console.log("Creature =", creatures[i].shortName, ", location =", creatures[i].location);
          // console.log("thisRoom =", thisRoom);
          for (let exit in room[creature[thisCreature].location].exits) {
            if ([exit].to && ![exit].invisible && ![exit].blocked) {exits.push([exit])};
          }
          let roll = Math.floor(Math.random() * Math.floor(100));
          // console.log("exits =", exits);
          if (roll <= 20) {
            // console.log("staying put, roll =", roll);
            // creature stays put
          } else {
            for (let i = 0 ; i < exits.length; i++) {
              if (roll <= 20 + (i+1) * (80 / exits.length)) {
                currData = move(creature[thisCreature], room[creature[thisCreature].location].exits[exits[i]], currData);
                if (currData.pass) {
                  if (room[creature[thisCreature].location] === playerLocation) {
                    currData.relay.push("The "+creature[thisCreature].shortName+" leaves "+exits[i]+".");
                  }
                  console.log(creature[thisCreature]+"'s location after move = "+currData.creature[thisCreature].location+" ; roll = ", roll);
                  if (currData.creature[thisCreature].location === playerLocation) {
                    currData.relay.push("A "+creature[thisCreature].shortName+" enters the room.");
                  }
                }
                break;
              }
            }
          }
          break;
        case "chase" :
          break;
        case "search" :
          break;
        case "flee" :
          break;
        case "blinded" :
          break;
        default: 
          console.log("advanceTurn() defaulted for "+creature[thisCreature]);
          currData.relay.push("advanceTurn() defaulted for "+creature[thisCreature]); 
      }
    }
  }
  console.log("outgoing data from advanceTurn() =", currData);
  return currData;
};

// *
// * Move actions
// *

const movePlayer = (words, playerLocation, playerInventory, room, creature, currData) => {
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
    default : currData.relay.push("SYSTEM: Movement not defined. - at movePlayer(), words[0] = '"+words[0]+"'"); console.log("Movement not defined at movePlayer()");
  }
  if (room[playerLocation].exits[word].to) {
    currData = move("player", room[playerLocation].exits[word], currData);
    if (currData.pass) {
      currData = describeRoom(currData.stateChange.playerLocation, room, creature, currData);
    };
  } else currData.relay.push("You can't go that way.");
  console.log("outgoing data from movePlayer() =", currData);
  return currData;
};

// Determines if a move direction works out
const move = (who, doorway, currData) => {
  console.log("data coming into move(), who =", who, "  doorway =", doorway);
  currData.pass = false;
  // check if doorway blocked (only player will be run into this check)
  if (doorway.blocked) {
    currData.relay.push(doorway.blocked);
  }
  // check if blocking Minotaur
  if (!(who.shortName !== "minotaur" || !doorway.minBlocked)) {
    currData.relay.push("The Minotaur can't quite fit through the passage, and roars in frustration.");
    console.log("Minotaur can't pass through doorway to "+doorway+".");
  } else {
    // the entity can successfully pass
    currData.pass = true;
    if (who === "player") { 
      // check for flavor text
      if (doorway.flavor) { currData.relay.push(doorway.flavor); } 
      currData = integrateStateChange(currData, { 
        playerLocation: doorway.to
      });
    } else {
      currData = integrateStateChange(currData, {
        creature: {
          [who]: {
            location: doorway.to
          }
        }
      })
    }
  }
  console.log("outgoing data from move() =", currData);
  return currData;
};

// relay description of room and any present items, creatures, and exits
const describeRoom = (playerLocation, room, creature, currData) => {
  // add room name and description to echo relay
  currData.relay.push(room[playerLocation].name, room[playerLocation].desc);
  // add creatures present to echo relay
  for (let thisCreature in creature) {
    if (creature[thisCreature].location === playerLocation) {
      console.log("checking location of", creature[thisCreature], "=", creature[thisCreature].location);
      let str="There is a ";
      str+=creature[thisCreature].shortName;
      str+=creature[thisCreature].doing;
      currData.relay.push(str);
    }
  }
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
      currData.relay.push("You see "+items+" here.");
    } else {
      currData.relay.push([items.slice(0, -1).join(', '), items.slice(-1)[0]].join(items.length < 2 ? '' : ' and '));
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

  currData.relay.push("Exits: "+exits.join(", "));
  // echo 
  console.log("outgoing data from describeRoom() =", currData);
  return currData;
}

// *
// * Special actions
// *

const specialAction = (words, playerLocation, playerInventory, roomInventory, creature, currData) => {
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
    currData.relay.push("SYSTEM: Command not defined. - at specialAction(), words = '"+words.join(", "));
      console.log("Command not defined at specialAction(), word =", words[0]);
    
  }
  console.log("outgoing data from specialAction() =", currData);
  return currData;
}

// *
// * Item actions
// *

const itemAction = (words, playerLocation, playerInventory, room, creature, currData) => {
  switch (words[0]) {
    case "take" : case "get" : case "pick" : case "grab" : {
      currData = takeItem(words[1], playerLocation, playerInventory, room, creature, currData); break;
    }
    case "drop" : case "discard" : {
      currData = dropItem(words[1], playerLocation, playerInventory, room, creature, currData); break;
    }
    default : 
      currData.relay.push("SYSTEM: Command not defined. - at itemAction(), words = '"+words.join(", "));
    console.log("Command not defined at itemAction(), word =", words[0]);
  }
  console.log("outgoing data from itemAction() =", currData);
  return currData;
}

const takeItem = (word, playerLocation, playerInventory, room, creature, currData) => {
  if (word === "all" || word === "everything") {
    if (room[playerLocation].inventory.filter(item => !item.feature)) {
      playerInventory = playerInventory.concat(room[playerLocation].inventory.filter(item => !item.feature));
      console.log("inventory before stateChange =", playerInventory);
      console.log("after take: room =", room);
      currData.relay.push("You pick up everything that's not nailed down.");
      currData.takesTime = true;
      currData = integrateStateChange(currData, {
        playerInventory: playerInventory,
        room: { 
          [playerLocation]: {
            inventory: room[playerLocation].inventory.filter(item => item.feature)
          }
        }
      });
      console.log("outgoing data from successful takeItem('all') =", currData);
      return currData;
    } else {
      currData.relay.push("You don't see anything you can take.");
      console.log("takeItem(all) couldn't find anything. outgoing data =", currData);
      return currData;
    }
  } else {
    for (let i = 0; i < room[playerLocation].inventory.length; i++) {
      if (room[playerLocation].inventory[i].keywords.includes(word)) {
        if (room[playerLocation].inventory[i].feature) {
          currData.relay.push("You can't take that.");
          console.log("takeItem(word) couldn't take that. outgoing data =", currData);
          return currData;
        }
        let found = room[playerLocation].inventory[i].shortName;
        let item = room[playerLocation].inventory.splice(i, 1);
        playerInventory = playerInventory.concat(item);
        currData.relay.push("You pick up the "+found+".");
        currData.takesTime = true;
        currData = integrateStateChange(currData, {
          playerInventory: playerInventory,
          room: {
            [playerLocation]: { 
              inventory: room[playerLocation].inventory,
            }
          }
        });
      };
      console.log("Item picked up in takeItem(word). outgoing data =", currData);
      return currData;
    }
  }
  for (let i = 0; i < playerInventory.length; i++) {
    if (playerInventory[i].keywords.includes(word)) {
      currData.relay.push("You already have that!");
      console.log("Item already in inventory in takeItem(word). outgoing data =", currData);
      return currData;
    }
  }
  for (let thisCreature in creature) {
    if (creature[thisCreature].location === playerLocation) {
      if (creature[thisCreature].keywords.includes(word)) {
        currData.relay.push("I don't think they would like that.");
        console.log("Tried to take a creature in takeItem(word). outgoing data =", currData);
        return currData;
      }
    }
  }
  console.log("Looked for "+word+" and failed.");
  currData.relay.push("You don't see that here.");
  console.log("Failed to find item in takeItem(word). outgoing data =", currData);
  return currData;
};

const dropItem = (word, playerLocation, playerInventory, room, creature, currData) => {
  if (!playerInventory.length) {
    currData.relay.push("You aren't carrying anything!");
    console.log("Tried to drop from empty inv in dropItem(all). outgoing data =", currData);
    return currData;
  }
  if (word === "all" || word === "everything") {
    if (playerInventory.length) {
      room[playerLocation].inventory = room[playerLocation].inventory.concat(playerInventory);
      currData.relay.push("You drop everything you're carrying.");
      currData.takesTime = true;
      currData = integrateStateChange(currData, {
        playerInventory: [],
        room: { 
          [playerLocation]: {
            inventory: room[playerLocation].inventory
          }
        }
      });
    }
    console.log("Dropped all items in dropItem(all). outgoing data =", currData);
    return currData;
  }
  for (let i = 0; i < playerInventory.length; i++) {
    if (playerInventory[i].keywords.includes(word)) {
      let found = playerInventory[i].shortName;
      let item = playerInventory.splice(i, 1);
      room[playerLocation].inventory.push(item);
      currData.relay.push("You drop the "+found+".");
      currData.takesTime = true;
      currData = integrateStateChange(currData, {
        playerInventory: playerInventory,
        room: { 
          [playerLocation]: {
            inventory: room[playerLocation].inventory
          }
        }
      });
    }
    console.log("item dropped in dropItem(word). outgoing data =", currData);
    return currData;
  };
  currData.relay.push("You don't have that.");
  console.log("Couldn't drop '"+word+"' in dropItem(word). outgoing data =", currData);
  return currData;
};

// *
// * General actions
// *

const generalAction = (words, playerLocation, playerInventory, room, creature, currData) => {
  switch (words[0]) {
    case "l" : case "look" : case "exa" : case "examine" :
      currData = examine(words, playerLocation, playerInventory, room, creature, currData); break;
    case "z" : case "rest" : case "wait" :
      currData.relay.push("You chill for a minute. It's been a tough day, and you've earned it."); 
      currData.takesTime = true; break;
    default : 
      console.log("Command not defined at generalAction()");
      currData.relay.push("SYSTEM: Command not defined. - at generalAction(), words = "+words.join(", "));
  }
  console.log("Outgoing data from generalAction =", currData);
  return currData;
}

// Examine/Look action command
const examine = (words, playerLocation, playerInventory, room, creature, currData) => {
  if (words.length === 1 || words[1] === "room" || words[1] === "around") {
    let result = describeRoom(playerLocation, room, creature);
    currData.relay = currData.relay.concat(result.relay);
    console.log("Examining room in examine(word). outgoing data =", currData);
    return currData;
  }
  // check if player is a narcissist
  if (words[1] === "me" || words[1] === "myself") {
    // if (isMobile) this.viewCharacterToggle()} 
    currData.relay.push("You fine specimen, you.");
    console.log("Looking at self in dropItem(word). outgoing data =", currData);
    return currData;
  }
  // check player inventory if object not yet found
  for (let i = 0; i < playerInventory.length; i++) {
    if (playerInventory[i].keywords.includes(words[1])) {
      currData.relay.push(playerInventory[i].lookDesc);
      console.log("Found '"+words[1]+"' in playerInv in examine(word). outgoing data =", currData);
      return currData;
    }
  }
  // check room inventory if object not yet found
  // console.log("examine =", location.inventory);
  for (let i = 0; i < room[playerLocation].inventory.length; i++) {
    if (room[playerLocation].inventory[i].keywords.includes(words[1])) {
      currData.relay.push(room[playerLocation].inventory[i].lookDesc);
      console.log("Found '"+words[1]+"' in roomInv in examine(word). outgoing data =", currData);
      return currData;
    }
  }
  // check present creatures if object not yet found
  for (let thisCreature in creature) {
    if (creature[thisCreature].location === playerLocation) {
      if (creature[thisCreature].keywords.includes(words[1])) {
        currData.relay.push(creature[thisCreature].lookDesc);
        console.log("Found '"+words[1]+"' in creature array in examine(word). outgoing data =", currData);
      } else {
        // check present creature features (in creature inventory) if object not yet found
        for (let j = 0; j < creature[thisCreature].inventory.length; j++) {
          if (creature[thisCreature].inventory[j].keywords.includes([words[1]])) {
            currData.relay.push(creature[thisCreature].inventory[j].lookDesc);
            console.log("Found '"+words[1]+"' in creatureInv in examine(word). outgoing data =", currData);
            return currData;
          }
        }
      }
      return currData;
    }
  }
  currData.relay.push("You don't see that here.");
  console.log("Tried to examine something and didn't find it, in examine(word). outgoing data =", currData);
  return currData;
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
    creature: {},
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
      let creature = this.state.creature;
      let room = this.state.room;
      let currData = { relay: [], stateChange: {}, takesTime: false };
      console.log("in handlecommand: room =", room);
      console.log("in handlecommand: room[2] =", room["two"]);
      // add user command to relay
      currData.relay.push("> "+this.state.userCommand);
      // start command processing here
      currData = parseCommand(this.state.userCommand, playerLocation, playerInventory, room, creature, currData);
      console.log("currData returned from parseCommand() =", currData);
      // advance game time, resolve entity action
      if (currData.takesTime) {
        currData = advanceTurn(creature, playerLocation, room, currData);
        console.log("currData returned from advanceTurn() =", currData);
      }
      await this.setState((prevState, props) => (updateState(prevState, props, currData)));
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

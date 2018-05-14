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
const loadGame = (prevState, props) => {
  let room = require ("../Objects/RoomBuilder");
  let Items = require("../Objects/ItemBuilder");
  let allCreatures = require("../Objects/CreatureBuilder");
  
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
          if (allCreatures[Items[property].startingLoc[i]]) {
            allCreatures[Items[property].startingLoc[i]].inventory.push(Items[property]);
          }
        }
      } 
    }
  };

  // place player's starting room position
  let playerLocation = "two";

  // create initial relay
  let relay = [];
  relay.push("Welcome to the game.");
  
  let thisState = { 
    ...prevState,
    playerLocation: playerLocation,
    playerInventory: playerInventory,
    room: room, 
    allCreatures: allCreatures,
    relay: relay,
    health: 100,
    attack: 0,
    defense: 3,
    moveCount: 0,
    wielded: undefined,
    head: undefined,
    body: undefined,
    arms: undefined,
    legs: undefined,
    modifiers: {
      blind: false
    },
    options: {
      verbose: true,
    }
  };
  // console.log(thisState);
  let initialData = { relay: relay, state: thisState, takesTime: false };
  let firstRoom = describeRoom(initialData, creaturesHere(thisState.allCreatures, thisState.playerLocation));
  relay.concat(firstRoom.relay);
  return thisState;
};

const updateState = (prevState, props, currData) => {
  let newState = {
    ...prevState,
    userCommand: "",
  };

  if (currData.takesTime) {
    newState.moveCount = prevState.moveCount++;
  };
  
  // take in new relays
  let oldRelay = prevState.relay;
  currData.relay.forEach(ele => {
    // keep relay limited to 100 items
    if (oldRelay.length > 100) oldRelay.splice(0, 1);
    oldRelay.push(ele);       
  });
  newState.relay = oldRelay;

  // update other state changes
  newState = mergeObjects(newState, currData.state);
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

const parseCommand = (commandInput, currData) => {
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
    currData = movePlayer(command, currData);
    // console.log("outgoing data from movePlayer() => parseCommand() = ", currData);
    return currData;
  }
  else if (specialCommands.indexOf(command[0]) !== -1) {
    currData = specialAction(command, currData);
    // console.log("outgoing data from specialCommands() => parseCommand() =", currData);
    return currData;
  }
  else if (itemCommands.indexOf(command[0]) !== -1) {
    currData = itemAction(command, currData);
    // console.log("outgoing data from itemCommands() => parseCommand() =", currData);
    return currData;
  }
  else if (generalCommands.indexOf(command[0]) !== -1) {
    currData = generalAction(command, currData);
    // console.log("outgoing data from generalCommands() => parseCommand() =", currData);
    return currData;
  }
  console.log("parseCommand() error, command ="+command.join(", "));
  currData.relay.push("SYSTEM: Unknown command. - in parseCommand(), command = "+command.join(", "));
  return currData;
};

 
// * 
// * Advance game time, resolve entity action
// *

// const creaturesMove = (creatures, player) => {
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

const creaturesMove = (currData) => {
  for (let thisCreature in currData.state.allCreatures) {
    // check if there is an action queued in Creature's script array
    if (currData.state.allCreatures[thisCreature].script.length) {
      // console.log("room =", room[ele.location]);
      switch (currData.state.allCreatures[thisCreature].script[0]) {
        case "moveRandom" : 
          let exits = [];
          for (let exit in currData.state.room[currData.state.allCreatures[thisCreature].location].exits) {
            let thisExit = currData.state.room[currData.state.allCreatures[thisCreature].location].exits[exit];
            // console.log("checking", thisCreature, "'s exit ", thisExit);
            if (
                thisExit.to && !thisExit.invisible && !thisExit.blocked && (thisCreature !== "minotaur" || !thisExit.minBlocked)
            ) {
              exits.push([exit]);
            };
          }
          let roll = Math.floor(Math.random() * Math.floor(100));
          if (roll <= 50) {
            // creature stays put
          } else {
            for (let i = 0 ; i < exits.length; i++) {
              if (roll <= 50 + (i+1) * (50 / exits.length)) {
                currData = move(thisCreature, exits[i], currData.state.allCreatures[thisCreature].location, currData.state.room[currData.state.allCreatures[thisCreature].location].exits[exits[i]], currData);
                // console.log(thisCreature+"'s location after move = '"+currData.state.allCreatures[thisCreature].location+"' ; roll = ", roll);
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
          console.log("creaturesMove() defaulted for "+currData.state.allCreatures[thisCreature]);
          currData.relay.push("creaturesMove() defaulted for "+currData.state.allCreatures[thisCreature]); 
      }
    }
  }
  // console.log("outgoing data from creaturesMove() =", currData);
  return currData;
};

// *
// * Move actions
// *

const movePlayer = (words, currData) => {
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
  if (currData.state.room[currData.state.playerLocation].exits[word].to) {
    currData = move("player", word, currData.state.playerLocation, currData.state.room[currData.state.playerLocation].exits[word], currData);
    if (currData.pass) {
      currData.takesTime = true;
    };
  } else currData.relay.push("You can't go that way.");
  // console.log("outgoing data from movePlayer() =", currData);
  return currData;
};

// Determines if a move direction works out
const move = (who, direction, startingLocation, doorway, currData) => {
  currData.pass = false;
  // check if doorway blocked (only player will be run into this check)
  if (doorway.blocked) {
    currData.relay.push(doorway.blocked);
  } else 
  // check if blocking Minotaur
  if (who === "minotaur" & doorway.minBlocked) {
    currData.relay.push("The Minotaur can't quite fit through the passage, and roars in frustration.");
    console.log("Minotaur can't pass through doorway to "+doorway+".");
  } else {
    // the entity can successfully pass
    currData.pass = true;
    if (who === "player") { 
      // handle successful player move
      // check for flavor text
      if (doorway.flavor) { currData.relay.push(doorway.flavor); }
      // console.log("move(player) - mergeObjects() with ", currData.state);
      currData.state = mergeObjects(currData.state, { 
        playerLocation: doorway.to
      });
      describeRoom(currData, creaturesHere(currData.state.allCreatures, currData.state.playerLocation))
      // console.log("move(player) - mergeObjects() returns", currData);
    } else {
      // handle successful creature move

      // set up relay for when creature enters/exits player's location
      if (doorway.to === currData.state.playerLocation) {
        let creaturesPresent = creaturesHere(currData.state.allCreatures, currData.state.playerLocation);
        // set up relay for blind player
        if (who === "minotaur") {
          if (canSee(currData.state.room[currData.state.playerLocation], currData.state.playerInventory, creaturesPresent, currData.state.modifiers)) {
            currData.relay.push("The Minotaur charges into the room!");
          } else {
            currData.relay.push("You feel a malevolent presence enter the room.");
          }
        } else {
            if (canSee(currData.state.room[currData.state.playerLocation], currData.state.playerInventory, creaturesPresent, currData.state.modifiers)) {
              currData.relay.push("A "+who+" enters the room.");
            } else {
              currData.relay.push("You feel a presence enter the room. You hope it's gentle.");
            }
        }
      }
      if (startingLocation === currData.state.playerLocation) {
        if (who === "minotaur") {
          currData.relay.push("The Minotaur flees "+direction+"!");
        } else {
          currData.relay.push("The "+who+" leaves "+direction+".");
        }
      }
      // console.log("move(creature) - mergeObjects() with ", currData.state);
      console.log(who, "moving from", startingLocation, "to", doorway.to);
      currData.state = mergeObjects(currData.state, {
        allCreatures: {
          [who]: {
            location: doorway.to
          }
        }
      });
      // console.log("move(creature) - mergeObjects() returns", currData.state)
    }
  }
  // console.log("outgoing data from move() =", currData);
  return currData;
};

// relay description of room and any present items, creatures, and exits
const describeRoom = (currData, creaturesPresent) => {
  // add room name and description to echo relay
  currData.relay.push(currData.state.room[currData.state.playerLocation].name);
  if (currData.state.modifiers.blind) {
    currData.relay.push("You're completely blind! You should hope you don't fall in a pit.");
  } else 
  if (canSee(currData.state.room[currData.state.playerLocation], currData.state.playerInventory, creaturesPresent, currData.state.modifiers)) {
    currData.relay.push(currData.state.room[currData.state.playerLocation].desc);
  } else {
    currData.relay.push("It is pitch-black in here. You are likely to be eaten by something gruesome.")
  }
  // add creatures present to relay
  if (!isEmpty(creaturesPresent)) {
    console.log("one or more creatures present");
    if (canSee(currData.state.room[currData.state.playerLocation], currData.state.playerInventory, creaturesPresent, currData.state.modifiers)) {
      for (let thisCreature in creaturesPresent) {
        if (creaturesPresent[thisCreature].location === currData.state.playerLocation) {
          // console.log("checking location of", creaturesPresent[thisCreature], "=", creaturesPresent[thisCreature].location);
          let str="There is a "+creaturesPresent[thisCreature].shortName+" "+creaturesPresent[thisCreature].doing;
          currData.relay.push(str);
        }
      }
    } else {
      currData.relay.push("You hear something moving around in the dark.");
    }
  }
  // add room inventory contents to relay
  if (currData.state.room[currData.state.playerLocation].inventory.filter(item => !item.feature).length && canSee(currData.state.room[currData.state.playerLocation], currData.state.playerInventory, creaturesPresent, currData.state.modifiers)) {
    let items = [];
    for (let i = 0; i < currData.state.room[currData.state.playerLocation].inventory.length; i++) {
      if (currData.state.room[currData.state.playerLocation].inventory[i].feature) {
        // skip item, because it's a feature
      } else {
        items.push("a "+currData.state.room[currData.state.playerLocation].inventory[i].shortName);
      }
    }
    currData.relay.push("You see "+[items.slice(0, -1).join(', '), items.slice(-1)[0]].join(items.length < 2 ? '' : ' and ')+" here.");
  }

  // add exits to relay
  if (canSee(currData.state.room[currData.state.playerLocation], currData.state.playerInventory, creaturesPresent, currData.state.modifiers)) {
    let exits =[];
    for (let door in currData.state.room[currData.state.playerLocation].exits) {
      let thisDoor = currData.state.room[currData.state.playerLocation].exits[door];
      if (thisDoor.to && !thisDoor.invisible) exits.push(door);
    }
    if (exits.length) {
      currData.relay.push("Exits: "+exits.join(", "));
    }
  }
  // console.log("outgoing data from describeRoom() =", currData);
  return currData;
};

// *
// * Special actions
// *

const specialAction = (words, currData) => {
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

const itemAction = (words, currData) => {
  switch (words[0]) {
    case "take" : case "get" : case "pick" : case "grab" : {
      currData = takeItem(words, currData); break;
    }
    case "drop" : case "discard" : {
      currData = dropItem(words, currData); break;
    }
    default : 
      currData.relay.push("SYSTEM: Command not defined. - at itemAction(), words = '"+words.join(", "));
    console.log("Command not defined at itemAction(), word =", words[0]);
  }
  return currData;
}

const takeItem = (words, currData) => {
  let creaturesPresent = creaturesHere(currData.state.allCreatures, currData.state.playerLocation)
  if (words[1] === "all" || words[1] === "everything") {
    // "take" subject is all items in room
    if (canSee(currData.state.room[currData.state.playerLocation], currData.state.playerInventory, creaturesPresent, currData.state.modifiers)) {
      if (currData.state.room[currData.state.playerLocation].inventory.filter(item => (!item.feature)).length) {
        let roomItems = currData.state.room[currData.state.playerLocation].inventory.filter(item => !item.feature);
        currData.state.playerInventory = currData.state.playerInventory.concat(roomItems);
        currData.relay.push("You pick up everything that's not nailed down.");
        currData.takesTime = true;
        currData.state = mergeObjects(currData.state, {
          playerInventory: currData.state.playerInventory,
          room: { 
            [currData.state.playerLocation]: {
              inventory: currData.state.room[currData.state.playerLocation].inventory.filter(item => item.feature)
            }
          }
        });
        return currData;
      } else {
        currData.relay.push("You don't see anything you can take.");
        return currData;
      } 
    } else {
      currData.relay.push("You can't see well enough to be greedy.");
    }
  } else {
    // "take" subject is not "all", looking in room for item
    for (let i = 0; i < currData.state.room[currData.state.playerLocation].inventory.length; i++) {
      if (currData.state.room[currData.state.playerLocation].inventory[i].keywords.includes(words[1])) {
        // item found in room
        // check if item is room feature (and not takeable)
        if (currData.state.room[currData.state.playerLocation].inventory[i].feature) {
          currData.relay.push("You can't take that.");
          console.log("takeItem(single) couldn't take that. outgoing data =", currData);
          return currData;
        }
        let found = currData.state.room[currData.state.playerLocation].inventory[i].shortName;
        let item = currData.state.room[currData.state.playerLocation].inventory.splice(i, 1);
        currData.state.playerInventory = currData.state.playerInventory.concat(item);
        console.log("TAKE player inv =", currData.state.playerInventory);
        currData.relay.push("You pick up the "+found+".");
        currData.takesTime = true;
        console.log("takeItem(single) - mergeObjects() with ", currData.state);
        currData.state = mergeObjects(currData.state, {
          playerInventory: currData.state.playerInventory,
          room: {
            [currData.state.playerLocation]: { 
              inventory: currData.state.room[currData.state.playerLocation].inventory,
            }
          }
        });
        console.log("takeItem(single) - mergeObjects() returns", currData.state)
        // console.log("Item picked up in takeItem(single). outgoing data =", currData);
        return currData;
      };
    }
  }
  // "take" subject is not in room, checking player inventory
  for (let i = 0; i < currData.state.playerInventory.length; i++) {
    if (currData.state.playerInventory[i].keywords.includes(words[1])) {
      currData.relay.push("You already have that!");
      console.log("Item already in inventory in takeItem(single). outgoing data =", currData);
      return currData;
    }
  }
  // "take" subject is not in room or player inv, checking creatures
  for (let thisCreature in creaturesPresent) {
    if (creaturesPresent[thisCreature].location === currData.state.playerLocation) {
      if (creaturesPresent[thisCreature].keywords.includes(words[1])) {
        currData.relay.push("I don't think they would like that.");
        console.log("Tried to take a creature in takeItem(single). outgoing data =", currData);
        return currData;
      }
    }
  }
  // can't find "take" subject
  console.log("Looked for "+words[1]+" and failed.");
  currData.relay.push("You don't see that here.");
  console.log("Failed to find item in takeItem(single). outgoing data =", currData);
  return currData;
};

const dropItem = (words, currData) => {
  if (currData.state.playerInventory.length) {
    if (words[1] === "all" || words[1] === "everything") {
      currData.state.room[currData.state.playerLocation].inventory = currData.state.room[currData.state.playerLocation].inventory.concat(currData.state.playerInventory);
      currData.relay.push("You drop everything you're carrying.");
      currData.takesTime = true;
      currData.state = mergeObjects(currData.state, {
        playerInventory: [],
        room: { 
          [currData.state.playerLocation]: {
            inventory: currData.state.room[currData.state.playerLocation].inventory
          }
        }
      });
      return currData;
    } else {
      for (let i = 0; i < currData.state.playerInventory.length; i++) {
        if (currData.state.playerInventory[i].keywords.includes(words[1])) {
          let found = currData.state.playerInventory[i].shortName;
          let item = currData.state.playerInventory.splice(i, 1);
          currData.state.room[currData.state.playerLocation].inventory.push(item[0]);
          currData.relay.push("You drop the "+found+".");
          currData.takesTime = true;
          currData.state = mergeObjects(currData.state, {
            playerInventory: currData.state.playerInventory,
            room: { 
              [currData.state.playerLocation]: {
                inventory: currData.state.room[currData.state.playerLocation].inventory
              }
            }
          });
          console.log("dropItem(single) - mergeObjects() returns", currData.state)
          return currData;
        }
      };
    }
    currData.relay.push("You don't have that.");
    console.log("Couldn't drop '"+words[1]+"' in dropItem(single). outgoing data =", currData);
    return currData;
  } else {
    currData.relay.push("You aren't carrying anything!");
    console.log("Tried to drop from empty inv in dropItem(). outgoing data =", currData);
    return currData;
  }
};

// *
// * General actions
// *

const generalAction = (words, currData) => {
  let creaturesPresent = creaturesHere(currData.state.allCreatures, currData.state.playerLocation);
  switch (words[0]) {
    case "l" : case "look" : case "exa" : case "examine" :
      if (canSee(currData.state.room[currData.state.playerLocation], currData.state.playerInventory, creaturesPresent, currData.state.modifiers)) {
        currData = examine(words, currData);
      } else {
        currData.relay.push("You can't see anything!"); 
      }
      break;
    case "z" : case "rest" : case "wait" :
      currData.relay.push("You chill for a minute. It's been a tough day, and you've earned it."); 
      currData.takesTime = true; break;
    default : 
      console.log("Command not defined at generalAction()");
      currData.relay.push("SYSTEM: Command not defined. - at generalAction(), words = "+words.join(", "));
  }
  return currData;
}

// Examine/Look action command
const examine = (words, currData) => {
  let creaturesPresent = creaturesHere(currData.state.allCreatures, currData.state.playerLocation);
  if (words.length === 1 || words[1] === "room" || words[1] === "around") {
    describeRoom(currData, creaturesPresent);
    return currData;
  } else 
  // check if player is a narcissist
  if (words[1] === "me" || words[1] === "myself") {
    // if (isMobile) this.viewCharacterToggle()} 
    currData.relay.push("You fine specimen, you.");
    console.log("Looking at self in dropItem(word). outgoing data =", currData);
    return currData;
  }
  // check player inventory if object not yet found
  for (let i = 0; i < currData.state.playerInventory.length; i++) {
    if (currData.state.playerInventory[i].keywords.includes(words[1])) {
      currData.relay.push(currData.state.playerInventory[i].lookDesc);
      console.log("Found '"+words[1]+"' in playerInv in examine(word). outgoing data =", currData);
      return currData;
    }
  }
  // check room inventory if object not yet found
  for (let i = 0; i < currData.state.room[currData.state.playerLocation].inventory.length; i++) {
    if (currData.state.room[currData.state.playerLocation].inventory[i].keywords.includes(words[1])) {
      currData.relay.push(currData.state.room[currData.state.playerLocation].inventory[i].lookDesc);
      console.log("Found '"+words[1]+"' in roomInv in examine(word). outgoing data =", currData);
      return currData;
    }
  }
  // check present creatures if object not yet found
  for (let thisCreature in creaturesPresent) {
    if (creaturesPresent[thisCreature].keywords.includes(words[1])) {
      currData.relay.push(creaturesPresent[thisCreature].lookDesc);
      console.log("Found '"+words[1]+"' in creature array in examine(word). outgoing data =", currData);
    } else {
      // check present creature features (in creature inventory) if object not yet found
      for (let j = 0; j < creaturesPresent[thisCreature].inventory.length; j++) {
        if (creaturesPresent[thisCreature].inventory[j].keywords.includes(words[1])) {
          currData.relay.push(creaturesPresent[thisCreature].inventory[j].lookDesc);
          console.log("Found '"+words[1]+"' in creatureInv in examine(word). outgoing data =", currData);
          return currData;
        }
      }
    }
    return currData;
  }
  currData.relay.push("You don't see that here.");
  console.log("Tried to examine something and didn't find it, in examine(word). outgoing data =", currData);
  return currData;
}

// * 
// * Utilities
// * 

// Keeps roomDesc window scrolled to bottom
const updateScroll = () => {
  var element = document.getElementById("roomDesc");
  element.scrollTop = element.scrollHeight;
};

//  mergeObjects
//  integrates two objects by updating existing properties and adding new ones
// replaces arrays rather than merges them unless "true" passed to mergeArrays
const mergeObjects = (data, add, mergeArrays) => {
  for (let prop in add) {
    !data.hasOwnProperty(prop) ? data[prop] = add[prop] : (data[prop] = typeof data[prop] !== "object" ? add[prop] : (Array.isArray(data[prop]) && !mergeArrays ? data[prop] = add[prop] : mergeObjects(data[prop], add[prop])))
  }
  return data;
};

// logging assistant for error checking (because console.log is asynchronous when examining objects)
const logThis = (thing, where) => {
  console.log("LOGGING", where);
  for (let prop in thing) {
    if (typeof thing[prop] !== "object") {
      console.log(prop, "=", thing[prop]);
    } else {
      if (Array.isArray(thing[prop])) {
        // thing[prop].forEach(ele => console.log("logging ", ele, "in array", thing));
      } else {
        logThis(thing[prop]);
      }
    }
  }
  return thing;
};

// logging assistant for currData; needs work
// where = string, success = boolean, data is passed to logThis()
const logData = (data, where, success, logDataSkip) => {
  if (!logDataSkip) {
    let str = where;
    (success)?str+=" succeeded":str+=" failed";
    str += ", outgoing data =";
    console.log(str);
    for (let prop in data) logThis(data[prop]);
  }
}
let logDataSkip = true;
logData("no-unused-vars warning skipper", false, null, logDataSkip);

// quick ping
const ping = () => console.log("ping");

// checks if object is empty
const isEmpty = obj => {
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}

// checks if light source is present in room
const canSee = (room, playerInv, creaturesPresent, modifiers) => {
  let light = !room.dark;
  playerInv.forEach(ele => {
    if (ele.lightSource) light = true;
  });
  room.inventory.forEach(ele => {
    if (ele.lightSource) light = true;
  });
  for (let thisCreature in creaturesPresent) {
    for (let i = 0; i < creaturesPresent[thisCreature].inventory.length; i++) {
      if (creaturesPresent[thisCreature].inventory[i].lightSource) {
        light = true; 
      }
    }
  }
  if (modifiers.blind === true) {
    light = false;
  }
  return light;
}

// collects creatures present at playerLocation
const creaturesHere = (allCreatures, playerLocation) => {
  let creaturesPresent = {};
  for (let thisCreature in allCreatures) {
    if (allCreatures[thisCreature].location === playerLocation) {
      creaturesPresent[thisCreature] = allCreatures[thisCreature];
    };
  }
  return creaturesPresent;
}

// checks if being viewed in mobile layout
let isMobile = window.innerWidth < 768 ? true : false;

class GamePage extends React.Component {

  componentDidMount() {

    // update authenticated state on logout
    this.props.toggleAuthenticateStatus();

    if (this.state.loadingFreshGame) {
      console.log("loading fresh game");
      this.setState((prevState, props) => loadGame(prevState, props));
      this.setState({ loadingFreshGame: false });
    }
  }

  state = {
    loadingFreshGame: true,
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
    allCreatures: {},
    relay: [],
    health: 100,
    attack: 0,
    defense: 3,
    moveCount: 0,
    wielded: undefined,
    head: undefined,
    body: undefined,
    arms: undefined,
    legs: undefined,
    modifiers: {
      blind: undefined
    },
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
      let currData = { relay: [], state: {
        playerLocation: this.state.playerLocation,
        playerInventory: this.state.playerInventory,
        room: this.state.room, 
        allCreatures: this.state.allCreatures,
        relay: this.state.relay,
        health: this.state.health,
        attack: this.state.health,
        defense: this.state.defense,
        moveCount: this.state.moveCount,
        wielded: this.state.wielded,
        head: this.state.head,
        body: this.state.body,
        arms: this.state.arms,
        legs: this.state.legs,
        modifiers: this.state.modifiers,
        options: this.state.modifiers
      }, takesTime: false };
      console.log("*** command entered:", this.state.userCommand, "***");

      // add user command to relay
      currData.relay.push("> "+this.state.userCommand);

      // start command processing here      
      currData = parseCommand(this.state.userCommand, currData);
      // console.log("currData returned from parseCommand() =", currData);
      // advance game time, resolve entity action
      if (currData.takesTime) {
        currData = creaturesMove(currData);
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
          handleSaveButton={this.handleSaveButton}>
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

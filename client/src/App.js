import React, { Component } from "react";
import "./App.css";
import Wrapper from "./components/Wrapper/Wrapper";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import About from "./components/About";
import Help from "./components/Help";
import room from "./Objects/RoomBuilder";
import item from "./Objects/ItemBuilder";
import Game from "./components/Game";
import Inventory from "./components/Inventory";
import Equipment from "./components/Equipment";
import Statistics from "./components/Statistics";
import { Input } from "./components/Form";

const echo = (relay, textBuffer, userCommand) => {
  let arr = textBuffer;
  relay.forEach(ele => {
    if (userCommand) ele="> "+ele;
    if (arr.length > 100) arr.splice(0, 1);
    arr.push(ele);       
  });
  return arr;
};

const moveWords = [
  "n", "ne", "e", "se", "s", "sw", "w", "nw", "north", "east", "south", "west", "northeast", "southeast", "southwest", "northwest", "go", "walk", "run", "enter", "in", "up", "u", "d", "down", "leave"
];
// const newTurn = (location) => {

// };

const initializeVariables = (item) => {
  // item.forEach(ele) {
    // let window[ele.variableName]
  // }
}
// create keyword associations

const updateScroll = () => {
  var element = document.getElementById("roomDesc");
  element.scrollTop = element.scrollHeight;
};

let isMobile = window.innerWidth < 768 ? true : false;

class App extends Component {

  state = {
    userCommand: "",
    inProgress: true,
    login: false,
    viewCharacter: false,
    viewAbout: false,
    viewHelp: false,
    isMobile: isMobile,
    player: {
      location: 0,
      equipment: {
        wielded: "nothing",
        head: "nothing",
        body: "nothing",
        arms: "nothing",
        legs: "nothing"
      },
      inventory: [],
      stats: {
        health: 100,
        attack: 0,
        defense: 3
      },
      options: {
        verbose: true,
      }
    },
    entities: [],
    textBuffer: []
  }

  echo = (relay, textBuffer, userCommand) => {
    let arr = textBuffer.concat();
    relay.forEach(ele => {
      if (userCommand) ele="> "+ele;
      if (arr.length > 100) arr.splice(0, 1);
      arr.push(ele);       
    });
    this.setState({textBuffer: arr});
  };

  startNewGame() {
    this.describeRoom(this.state.player.location);
  }

  componentDidMount() {
    this.startNewGame();
  }

  describeRoom(currLoc) {
    console.log("@loadCurrentState current room = ", currLoc);
    let relay = [];
    relay.push(room[currLoc].name);
    relay.push(room[currLoc].desc);
    // let items = [];
    // if (room[currLoc].items.length !== 0) {
    //   room[currLoc].items.forEach(ele => {
    //     items.push(ele.shortName);
    //   })
    //   relay.push("You see ")
    let exits =[];
    if (room[currLoc].n.to && room[currLoc].n.visible) exits.push("north");
    if (room[currLoc].ne.to && room[currLoc].ne.visible) exits.push("northeast");
    if (room[currLoc].e.to && room[currLoc].e.visible) exits.push("east");
    if (room[currLoc].se.to && room[currLoc].se.visible) exits.push("southeast");
    if (room[currLoc].s.to && room[currLoc].s.visible) exits.push("south");
    if (room[currLoc].sw.to && room[currLoc].sw.visible) exits.push("southwest");
    if (room[currLoc].w.to && room[currLoc].w.visible) exits.push("west");
    if (room[currLoc].nw.to && room[currLoc].nw.visible) exits.push("northwest");
    if (room[currLoc].up.to && room[currLoc].up.visible) exits.push("up");
    if (room[currLoc].down.to && room[currLoc].down.visible) exits.push("down");
    if (room[currLoc].in.to && room[currLoc].in.visible) exits.push("in");
    if (room[currLoc].out.to && room[currLoc].out.visible) exits.push("out");
    relay.push("Exits: "+exits.join(", "));
    echo(relay, this.state.textBuffer);
  }

  handleUserCommand = event => {
    event.preventDefault();
    // check for non-empty command input
    if (this.state.userCommand) {
      let thisCommand = this.state.userCommand;
      // echo command
      this.setState({
        textBuffer: echo([this.state.userCommand], this.state.textBuffer, true),
        userCommand: ""
      });
      // start command processing and turn action here
      this.parseCommand(thisCommand);
      // assure roomDesc window is scrolled to bottom
    }
    // updateScroll();
  };

  // parse command
  parseCommand = (command) => {
    command.toLowerCase()
    let commandWords = command.split(" ", 5);
    console.log("commandWords =", commandWords);
    //check for move command
    if (moveWords.includes(commandWords[0])) {
      this.movePlayer(commandWords)
    } else { 
      if (commandWords[0] === "l" || commandWords[0] === "look") {
        this.describeRoom(this.state.player.location);
      } else {
        echo(["Unknown command. - in parseCommand()"], this.state.textBuffer) 
      }
    };
    // look command
    // word array
    // turn into sentence array
      // 
    // analyze first word
  };

  // actions
  async movePlayer(words) {
    let currLoc = this.state.player.location;
    let newLoc;
    let nope = "You can't go that way.";
    let blocked = "That way is blocked.";
    if ((words[0] === "go" || words[0] === "walk" ||words[0] === "run")) {words.shift()};
    if ((words[0] === "n" || words[0] === "north") && (words[1] === "e" || words[1] === "east")) {words[0] = "ne"};
    if ((words[0] === "n" || words[0] === "north") && (words[1] === "w" || words[1] === "west")) {words[0] = "nw"};
    if ((words[0] === "s" || words[0] === "south") && (words[1] === "e" || words[1] === "east")) {words[0] = "se"};
    if ((words[0] === "s" || words[0] === "south") && (words[1] === "w" || words[1] === "west")) {words[0] = "sw"};
    console.log("adjusted words[0] =", words[0]);
    switch (words[0]) {
      case "n" : case "north" :
        if (room[currLoc].n.to) {
          room[currLoc].n.blocked ? newLoc = "That way is blocked." : newLoc = room[currLoc].n.to;
        } else { newLoc = "You can't go that way." }
        break;
      case "s" : case "south" :
        if (room[currLoc].s.to) {
          room[currLoc].s.blocked ? newLoc = "That way is blocked." : newLoc = room[currLoc].s.to;
        } else { newLoc = "You can't go that way." }
        break;
      case "e" : case "east" :
        if (room[currLoc].e.to) {
          room[currLoc].e.blocked ? newLoc = "That way is blocked." : newLoc = room[currLoc].e.to;
        } else { newLoc = "You can't go that way." }
        break;
      case "w" : case "west" :
        if (room[currLoc].w.to) {
          room[currLoc].w.blocked ? newLoc = "That way is blocked." : newLoc = room[currLoc].w.to;
        } else { newLoc = "You can't go that way." }
        break;
      case "ne" : case "northeast" :
        if (room[currLoc].ne.to) {
          room[currLoc].ne.blocked ? newLoc = "That way is blocked." : newLoc = room[currLoc].ne.to;
        } else { newLoc = "You can't go that way." }
        break;
      case "se" : case "southeast" :
        if (room[currLoc].se.to) {
          room[currLoc].se.blocked ? newLoc = "That way is blocked." : newLoc = room[currLoc].se.to;
        } else { newLoc = "You can't go that way." }
        break;
      case "sw" : case "southwest" :
        if (room[currLoc].sw.to) {
          room[currLoc].sw.blocked ? newLoc = "That way is blocked." : newLoc = room[currLoc].sw.to;
        } else { newLoc = "You can't go that way." }
        break;
      case "nw" : case "northwest" :
        if (room[currLoc].nw.to) {
          room[currLoc].nw.blocked ? newLoc = "That way is blocked." : newLoc = room[currLoc].nw.to;
        } else { newLoc = "You can't go that way." }
        break;
      case "u" : case "up" :
        if (room[currLoc].up.to) {
          room[currLoc].up.blocked ? newLoc = "That way is blocked." : newLoc = room[currLoc].up.to;
        } else { newLoc = "You can't go that way." }
        break;
      case "d" : case "down" :
        if (room[currLoc].down.to) {
          room[currLoc].down.blocked ? newLoc = "That way is blocked." : newLoc = room[currLoc].down.to;
        } else { newLoc = "You can't go that way." }
        break;
      case "in" : case "into" :
        if (room[currLoc].in.to) {
          room[currLoc].in.blocked ? newLoc = "That way is blocked." : newLoc = room[currLoc].in.to;
        } else { newLoc = "You can't go that way." }
        break;
      case "leave" : case "out" :
        if (room[currLoc].out.to) {
          room[currLoc].out.blocked ? newLoc = "That way is blocked." : newLoc = room[currLoc].out.to;
        } else { newLoc = "You can't go that way." }
        break;
      default : newLoc = "Movement not defined. - at movePlayer(), words[0] = "+words[0]
    }
    if (typeof newLoc !== "number") { echo([newLoc], this.state.textBuffer) } else {
      await this.setState(prevState => ({
        player: {
           ...prevState.player,
           location: newLoc
        }
      }))
    }
    console.log("@parseCommand current room = ", this.state.player.location);

    this.describeRoom(this.state.player.location);
    updateScroll();
  };

  handleInputChange = event => {
    this.setState({ userCommand: event.target.value });
  };

  startButtons() {
    if (this.state.login === true) {
      return (
        <div>
          <button onClick={() => this.handleLoadGame(this.state.login)}>Load Game</button>
          <button onClick={() => this.handleLogoutButton(this.state.login)}>Log Out</button>
        </div>
      )
    } else {
      return (
        <button onClick = {() => this.handleLoginButton} >Log In to Save and Load</button>
      )
    }
  }

  handleNewGame = () => {
    console.log("New Game button firing");
    this.setState({
      inProgress: true
    })
  }

  handleLoginButton = () => {
    console.log("Login button firing");

  }

  handleLogoutButton = data => {
    console.log("Logout button firing");
  }

  viewCharacterToggle = () => {
    this.setState({viewCharacter: !this.state.viewCharacter});
  }

  viewAboutToggle = () => {
    this.setState({viewAbout: !this.state.viewAbout});
  }

  viewHelpToggle = () => {
    this.setState({viewHelp: !this.state.viewHelp});
  }
  
  handleQuitButton = () => {
    console.log("Quit button firing");
    this.setState({
      inProgress: false
    })
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

  handleLoadGame = data => {

  }

  showGame() {
    if (this.state.inProgress === true) {
      return (
        <Game 
          isMobile={this.state.isMobile} 
          player={this.state.player} 
          entities={this.state.entities} 
          textBuffer={this.state.textBuffer} 
          login={this.state.login} 
          viewAboutToggle={this.viewAboutToggle.bind(this)}
          viewHelpToggle={this.viewHelpToggle.bind(this)}
          viewCharacterToggle={this.viewCharacterToggle.bind(this)}
          handleQuitButton={this.handleQuitButton} 
          handleSaveButton={this.handleSaveButton} 
          handleLoginButton={this.handleLoginButton}>
          <form className="userCommandLine">
            <div className="form-group">
              <label>>&nbsp;</label>
              <Input
                value={this.state.userCommand}
                onChange={this.handleInputChange}
                name="userCommand"
                type="text"
                id="command"
                onClick={(e) => {this.handleUserCommand(e)}} 
              />
              <button type="submit" onClick={(e) => {this.handleUserCommand(e)}} className="btn btn-success d-none">Submit</button>
            </div>
          </form>
        </Game>
      )
    } else {
      return (
        <div id="startScreen">
          <div className="buttonArea">
            <button onClick={() => this.handleNewGame()}>Start New Game</button>
            {this.startButtons()}  
          </div>
        </div>
      )
    }
  }

  render() {
    return (
      <Wrapper>
        <Modal isOpen={this.state.viewCharacter} toggle={this.viewCharacterToggle} className="characterModal">
          <ModalHeader toggle={this.viewCharacterToggle}>You</ModalHeader>
          <ModalBody>
            <Statistics stats={this.state.player.stats}/>
            <Equipment equipment={this.state.player.equipment}/>
            <Inventory inventory={this.state.player.inventory}/>
          </ModalBody>
        </Modal>
        <About 
          viewAbout={this.state.viewAbout}viewAboutToggle={this.viewAboutToggle.bind(this)} />
        <Help 
          viewHelp={this.state.viewHelp} viewHelpToggle={this.viewHelpToggle.bind(this)}/>
        {this.showGame()}
      </Wrapper>
    )
  };
}

export default App;

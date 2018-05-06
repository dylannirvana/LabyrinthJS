import React from 'react';
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import room from "../Objects/RoomBuilder";
import item from "../Objects/ItemBuilder";
import About from "../components/About.jsx";
import Help from "../components/Help.jsx";
import Game from "../components/Game";
import Inventory from "../components/Inventory.jsx";
import Equipment from "../components/Equipment.jsx";
import Statistics from "../components/Statistics.jsx";
import { Input } from "../components/Form";

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

let gameData = {
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
};

class GamePage extends React.Component {

  componentDidMount() {
    // update authenticated state on logout
    this.props.toggleAuthenticateStatus()

    if (this.loadData) {
      gameData = this.loadData;
    } else {
      this.describeRoom(this.state.game.player.location);
    }
  }

  state = {
    userCommand: "",
    inProgress: true,
    authenticated: false,
    login: false,
    viewCharacter: false,
    viewAbout: false,
    viewHelp: false,
    // move below into newGameState
    game: gameData

    // }
    // player: {
    //   location: 0,
    //   equipment: {
    //     wielded: "nothing",
    //     head: "nothing",
    //     body: "nothing",
    //     arms: "nothing",
    //     legs: "nothing"
    //   },
    //   inventory: [],
    //   stats: {
    //     health: 100,
    //     attack: 0,
    //     defense: 3
    //   },
    //   options: {
    //     verbose: true,
    //   }
    // },
    // entities: [],
    // textBuffer: []
    // move above into newGameState
  }

  echo = (relay, textBuffer, userCommand) => {
    let arr = textBuffer.concat();
    relay.forEach(ele => {
      if (userCommand) ele="> "+ele;
      // keep textBuffer limited to 100 items
      if (arr.length > 100) arr.splice(0, 1);
      arr.push(ele);       
    });
    this.setState(prevState => ({
      userCommand: "",
      game: {
        ...prevState.game,
        textBuffer: arr
      }
    }));
    updateScroll();
  };

  // *
  // * HANDLE PLAYER COMMAND INPUT
  // *

  handleInputChange = event => {
    this.setState({ userCommand: event.target.value });
  };

  handleUserCommand = this.handleUserCommand.bind(this);

  async handleUserCommand(event) {
    event.preventDefault();
    // check for non-empty command input
    if (this.state.userCommand) {
      let thisCommand = this.state.userCommand;
      // echo command
      await this.echo([this.state.userCommand], this.state.game.textBuffer, true)
      // start command processing and turn action here
      this.parseCommand(thisCommand);
      // assure roomDesc window is scrolled to bottom
      updateScroll();
    }
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
        this.describeRoom(this.state.game.player.location);
      } else {
        this.echo(["Unknown command. - in parseCommand()"], this.state.game.textBuffer) 
      }
    };
    // look command
    // word array
    // turn into sentence array
      // 
    // analyze first word
  };

  // actions
  movePlayer(words) {
    let currLoc = this.state.game.player.location;
    let newLoc;
    const nope = "You can't go that way.";
    const blocked = "That way is blocked.";
    if ((words[0] === "go" || words[0] === "walk" ||words[0] === "run")) {words.shift()};
    if ((words[0] === "n" || words[0] === "north") && (words[1] === "e" || words[1] === "east")) {words[0] = "ne"};
    if ((words[0] === "n" || words[0] === "north") && (words[1] === "w" || words[1] === "west")) {words[0] = "nw"};
    if ((words[0] === "s" || words[0] === "south") && (words[1] === "e" || words[1] === "east")) {words[0] = "se"};
    if ((words[0] === "s" || words[0] === "south") && (words[1] === "w" || words[1] === "west")) {words[0] = "sw"};
    console.log("adjusted words[0] =", words[0]);
    switch (words[0]) {
      case "n" : case "north" :
        if (room[currLoc].n.to) {
          room[currLoc].n.blocked ? newLoc = blocked : newLoc = room[currLoc].n.to;
        } else { newLoc = nope }
        break;
      case "s" : case "south" :
        if (room[currLoc].s.to) {
          room[currLoc].s.blocked ? newLoc = blocked : newLoc = room[currLoc].s.to;
        } else { newLoc = nope }
        break;
      case "e" : case "east" :
        if (room[currLoc].e.to) {
          room[currLoc].e.blocked ? newLoc = blocked : newLoc = room[currLoc].e.to;
        } else { newLoc = nope }
        break;
      case "w" : case "west" :
        if (room[currLoc].w.to) {
          room[currLoc].w.blocked ? newLoc = blocked : newLoc = room[currLoc].w.to;
        } else { newLoc = nope }
        break;
      case "ne" : case "northeast" :
        if (room[currLoc].ne.to) {
          room[currLoc].ne.blocked ? newLoc = blocked : newLoc = room[currLoc].ne.to;
        } else { newLoc = nope }
        break;
      case "se" : case "southeast" :
        if (room[currLoc].se.to) {
          room[currLoc].se.blocked ? newLoc = blocked : newLoc = room[currLoc].se.to;
        } else { newLoc = nope }
        break;
      case "sw" : case "southwest" :
        if (room[currLoc].sw.to) {
          room[currLoc].sw.blocked ? newLoc = blocked : newLoc = room[currLoc].sw.to;
        } else { newLoc = nope }
        break;
      case "nw" : case "northwest" :
        if (room[currLoc].nw.to) {
          room[currLoc].nw.blocked ? newLoc = blocked : newLoc = room[currLoc].nw.to;
        } else { newLoc = nope }
        break;
      case "u" : case "up" :
        if (room[currLoc].up.to) {
          room[currLoc].up.blocked ? newLoc = blocked : newLoc = room[currLoc].up.to;
        } else { newLoc = nope }
        break;
      case "d" : case "down" :
        if (room[currLoc].down.to) {
          room[currLoc].down.blocked ? newLoc = blocked : newLoc = room[currLoc].down.to;
        } else { newLoc = nope }
        break;
      case "in" : case "into" :
        if (room[currLoc].in.to) {
          room[currLoc].in.blocked ? newLoc = blocked : newLoc = room[currLoc].in.to;
        } else { newLoc = nope }
        break;
      case "leave" : case "out" :
        if (room[currLoc].out.to) {
          room[currLoc].out.blocked ? newLoc = blocked : newLoc = room[currLoc].out.to;
        } else { newLoc = nope }
        break;
      default : newLoc = "SYSTEM: Movement not defined. - at movePlayer(), words[0] = "+words[0]
    }
    if (typeof newLoc !== "number") { this.echo([newLoc], this.state.game.textBuffer) } else {
      this.setState(prevState => ({
          game: {
            ...prevState.game,
            player: {
               ...prevState.game.player,
               location: newLoc
          }
        }
      }))
      this.describeRoom(this.state.game.player.location);
    }
    console.log("@parseCommand current room = ", this.state.game.player.location);
  };

  describeRoom(currLoc) {
    console.log("@ describeRoom() current room = ", currLoc);
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
    this.echo(relay, this.state.game.textBuffer);
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
            <Statistics stats={this.state.game.player.stats}/>
            <Equipment equipment={this.state.game.player.equipment}/>
            <Inventory inventory={this.state.game.player.inventory}/>
          </ModalBody>
        </Modal>
        <About 
          viewAbout={this.state.viewAbout}viewAboutToggle={this.viewAboutToggle.bind(this)} />
        <Help 
          viewHelp={this.state.viewHelp} viewHelpToggle={this.viewHelpToggle.bind(this)}/>
        <Game 
          player={this.state.game.player} 
          entities={this.state.game.entities} 
          textBuffer={this.state.game.textBuffer} 
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

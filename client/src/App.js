import React, { Component } from "react";
import "./App.css";
import Wrapper from "./components/Wrapper/Wrapper";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import About from "./components/About";
import Help from "./components/Help";
import room from "./Objects/WorldBuilder";
import Game from "./components/Game";
import Inventory from "./components/Inventory";
import Equipment from "./components/Equipment";
import Statistics from "./components/Statistics";
import { Input } from "./components/Form";

const echo = (textBuffer, content, userCommand) => {
  let arr = textBuffer;
  content.forEach(ele => {
    if (userCommand) ele="> "+ele;
    if (arr.length > 100) arr.splice(0, 1);
    arr.push(ele);       
  });
  return arr;
};

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
      location: room[0],
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
      }
    },
    entities: [],
    textBuffer: []
  }

  loadCurrentState() {

  }

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

  handleInputChange = event => {
    this.setState({ userCommand: event.target.value });
  };

  handleUserCommand = event => {
    event.preventDefault();
    if (this.state.userCommand) {
      this.setState({
        textBuffer: echo(this.state.textBuffer, [this.state.userCommand], true),
        userCommand: ""
      });
      updateScroll();
    }
    // updateScroll();
  };

  componentDidMount() {
    window.addEventListener('resize', () => {
      this.setState({
          isMobile: window.innerWidth < 768
      });
    }, false);
    this.loadCurrentState();
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

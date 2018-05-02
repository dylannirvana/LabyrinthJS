import React, { Component } from "react";
import "./App.css";
import Wrapper from "./components/Wrapper/Wrapper";
import About from "./components/About";
import Help from "./components/Help";
import Header from "./components/Header";
import room from "./Objects/WorldBuilder";
import Game from "./components/Game";
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
  console.log("updateScroll firing");
  var element = document.getElementById("roomDesc");
  element.scrollTop = element.scrollHeight;
};

class App extends Component {
  state = {
    userCommand: "",
    inProgress: true,
    login: false,
    activePage: "game",
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

  handleAboutButton = () => {
    console.log("About button firing");
    this.setState({lastPage: this.state.activePage});
    this.setState({activePage: "about"})
  }
  
  showAbout() {
    return (
      <div id="about">
        <button onClick={this.setState({activePage: this.state.lastPage})}>x</button>
        <Header>
          <button onClick={() => this.handleHelpButton()}>Help</button> <button onClick={() => this.handleAboutButton()}>About</button>  
        </Header>
        <About />
      </div>
    )
  }

  handleHelpButton = () => {
    console.log("Help button firing");
    this.setState({lastPage: this.state.activePage});
    this.setState({activePage: "help"})
  }
  
  showHelp() {
    return (
      <div id="help">
        <button onClick={this.setState({activePage: this.state.lastPage})}>x</button>
        <Header>
          <button onClick={() => this.handleHelpButton()}>Help</button> <button onClick={() => this.handleAboutButton()}>About</button>  
        </Header>
        <Help />
      </div>
    )
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
    console.log("handleUserCommand fired");
    if (this.state.userCommand) {
      this.setState({
        textBuffer: echo(this.state.textBuffer, [this.state.userCommand], true),
         userCommand: ""
      });
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
          handleHelpButton={this.handleHelpButton} 
          handleQuitButton={this.handleQuitButton} 
          handleSaveButton={this.handleSaveButton} 
          handleAboutButton={this.handleAboutButton} 
          handleLoginButton={this.handleLoginButton}>
          <form className="userCommandLine">
            <div className="form-group">
              > 
              <Input
                value={this.state.userCommand}
                onChange={this.handleInputChange}
                name="userCommand"
                placeholder=""
                type="text"
                id="command"
                onClick={this.handleUserCommand} 
              />
              <button type="submit" onClick={this.handleUserCommand} className="btn btn-success hidden">Submit</button>
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
        {this.state.activePage ===  "game" ? (this.showGame()) : this.state.activePage === "help" ? (this.showHelp()) : (this.showAbout())}
      </Wrapper>
    )
  };
}

export default App;

import React, { Component } from "react";
import "./App.css";
import Wrapper from "./components/Wrapper/Wrapper";
import { Button } from "react-bootstrap";
import About from "./components/pages/About/About";
import Help from "./components/pages/Help/Help";
import Header from "./components/Header";
import room from "./Objects/WorldBuilder";
import Game from "./components/Game";
import { Input } from "./components/Form";

class App extends Component {
  state = {
    inProgress: false,
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
  };

  loadCurrentState() {

  };

  startButtons() {
    if (this.state.login === true) {
      return (
        <div>
          <Button onClick={() => this.handleLoadGame(this.state.login)}>Load Your Game</Button>
          <Button onClick={() => this.handleLogOut(this.state.login)}>Log Out</Button>
        </div>
      )
    } else {
      return (
        <Button>Log In to Save and Load</Button>
      )
    }
  }

  handleNewGame() {
    this.setState({
      inProgress: true
    })
  };

  handleLogIn() {

  };

  handleLogOut(data) {

  };

  handleAboutButton() {
    this.setState({lastPage: this.state.activePage});
    this.setState({activePage: "about"})
  };
  
  showAbout() {
    return (
      <div id="about">
        <Button onClick={this.setState({activePage: this.state.lastPage})}>x</Button>
        <About />
      </div>
    )
  };

  handleHelpButton() {
    this.setState({lastPage: this.state.activePage});
    this.setState({activePage: "help"})
  };
  
  showHelp() {
    return (
      <div id="help">
        <Button onClick={this.setState({activePage: this.state.lastPage})}>x</Button>
        <Help />
      </div>
    )
  };

  handleSaveButton = data => {
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

  };

  componentDidMount() {
    this.loadCurrentState();
  };

  showGame() {
    if (this.state.inProgress === true) {
      return (
        <Game player={this.state.player} entities={this.state.entities} textBuffer={this.state.textBuffer} login={this.state.login}>
          <Input
            value={this.state.userCommand}
            onChange={this.handleInputChange}
            name="userCommand"
            placeholder=""
          />
        </Game>
      )
    } else {
      return (
        <div id="startScreen">
          <div className="buttonArea">
            <Button onClick={() => this.handleNewGame.bind()}>Start New Game</Button>
            {this.startButtons.bind()}  
          </div>
        </div>
      )
    }
  }

  render() {
    return (
      <Wrapper>
        <Header>
          <Button onClick={() => this.handleHelpButton()}>Help</Button> <Button onClick={() => this.handleAboutButton()}>About</Button>  
        </Header>
        {this.state.activePage ===  "game" ? (this.showGame()) : this.state.activePage === "help" ? (this.showHelp()) : (this.showAbout())}
      </Wrapper>
    )
  };
}

export default App;

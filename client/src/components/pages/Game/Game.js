import React from "react";
import "./Game.css";
import { Button } from "react-bootstrap";
import { Input } from "../../Form";
import Inventory from "../../Inventory";
import Equipment from "../../Equipment";
import Statistics from "../../Statistics";
import RoomDesc from "../../RoomDesc";
import room from "../../../Objects/WorldBuilder";

class Game extends React.Component {
  state = {
    inProgress: false,
    login: false,
    game: {
      activeRoom: room[0],
      player: {
        health: 100
      },
      entities: []
    }
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

  handleSaveGame = data => {
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

  handleQuitGame() {
    this.setState({
      inProgress: false
    })
  };

  componentDidMount() {
    this.loadCurrentState();
  };

  render() {
    return (
      <div>
        {this.state.inProgress ? (
          <div id="gameArea">
            <div id="playerInfo">
              <Inventory />
              <Equipment />
              <Statistics />
              <div>
                {this.state.loggedIn ? (<Button onClick={() => this.handleSaveButton(this.state.login, this.state.game)}>Save Game</Button>) : (<p>Log In to Save</p>)}
                <Button onClick={() => this.handleQuitGame()}>Quit Game</Button>
              </div>
            </div>
            <RoomDesc />
            <Input
              value={this.state.userCommand}
              onChange={this.handleInputChange}
              name="userCommand"
              placeholder=""
            />
          </div>
        ) : (
          <div id="startScreen">
            <div className="buttonArea">
              <Button onClick={() => this.handleNewGame()}>Start New Game</Button>
              {this.startButtons()}              
            </div>
          </div>
        )}
      </div>
    )
  }
};

export default Game;

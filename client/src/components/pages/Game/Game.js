import React from "react";
import "./Game.css";
import { Button } from "react-bootstrap";
import { Input, FormButton } from "../../Form";
import Inventory from "../../Inventory";
import Equipment from "../../Equipment";
import Statistics from "../../Statistics";
import RoomDesc from "../../RoomDesc";

class Game extends React.Component {
  state = {
    inProgress = false,
    loggedIn = false
  };

  loadCurrentState() {

  };

  loginButtons() {
    if (this.state.loggedIn = true) {
      return (
        <div>
          <Button>Load Your Game</Button>
          <Button>Log Out</Button>
        </div>
      )
    } else {
      return (
        <Button>Log In to Save and Load</Button>
      )
    }
  }

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
              <Button>Start New Game</Button>
              {this.loginButtons()}              
            </div>
          </div>
        )}
      </div>
    )
  }
};

export default Game;

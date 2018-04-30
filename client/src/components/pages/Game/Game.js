import React from "react";
import "./Game.css";
import { Button } from "react-bootstrap";
import { Input, FormButton } from "../../Form";
import Inventory from "../../Inventory";
import Equipment from "../../Equipment";
import Statistics from "../../Statistics";
import RoomDesc from "../../RoomDesc";

class Game extends React.Component {
  state = {};

  loadCurrentState() {

  };

  componentDidMount() {
    this.loadCurrentState();
  };

  render() {
    return (
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
    )
  }
};

export default Game;

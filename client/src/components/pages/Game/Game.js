import React from "react";
import "./Game.css";
import { Button, Col, Row, Grid } from "react-bootstrap";
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
    },
    player: {
      inventory: [],
      health: 100
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
          <Grid>
            <Row className="show-grid" id="gameArea">
              <Col xs={12} sm={3} id="playerInfo">
                <Row>
                  <Col xs={2} sm={12}>
                    {this.state.login ? (<Button onClick={() => this.handleSaveButton(this.state.login, this.state.game)}>Save Game</Button>) : (<Button>Log In</Button>)}
                  </Col>
                  <Col xs={3} sm={12}>
                    <Inventory inventory={this.state.player.inventory}/>
                  </Col>
                  <Col xs={3} sm={12}>
                    <Equipment />
                  </Col>
                  <Col xs={2} sm={12}>
                    <Statistics health={this.state.player.health}/>
                  </Col>
                  <Col xs={2} sm={12}>
                    <Button onClick={() => this.handleQuitGame()}>Quit</Button>
                  </Col>
                </Row>
              </Col>
              <Col xs={12} sm={9} id="playArea">
                <RoomDesc />
                <Input
                  value={this.state.userCommand}
                  onChange={this.handleInputChange}
                  name="userCommand"
                  placeholder=""
                />
              </Col>
            </Row>
          </Grid>
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

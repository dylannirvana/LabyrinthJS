import React from "react";
import "./Game.css";
import { Button, Col, Row, Grid } from "react-bootstrap";
import Inventory from "../Inventory";
import Equipment from "../Equipment";
import Statistics from "../Statistics";
import RoomDesc from "../RoomDesc";

const handleLogIn = (login) => {

};

const handleSaveButton = data => {
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

const handleQuitButton = () => {
  this.setState({
    inProgress: false
  })
};

const Game = props => (
  <div id="gameArea">
    <Grid>
      <Row className="show-grid">
        <Col xs={12} sm={3} id="playerInfo">
          <Row>
            <Col xs={2} sm={12}>
              {props.login ? (<Button onClick={() => handleSaveButton(props.player, props.entities)}>Save Game</Button>) : (<Button onClick={() => handleLogIn(props.login)}>Log In</Button>)}
            </Col> 
            <Col xs={3} sm={12}>
              <Inventory inventory={props.player.inventory}/>
            </Col>
            <Col xs={3} sm={12}>
              <Equipment equipment={props.player.equipment}/>
            </Col>
            <Col xs={2} sm={12}>
              <Statistics stats={props.player.stats}/>
            </Col>
            <Col xs={2} sm={12}>
              <Button onClick={() => handleQuitButton()}>Quit</Button>
            </Col>
          </Row>
        </Col>
        <Col xs={12} sm={9} id="playArea">
          <RoomDesc text={props.textBuffer} />
          {props.children}
        </Col>
      </Row>
    </Grid>
  </div>
);

export default Game;

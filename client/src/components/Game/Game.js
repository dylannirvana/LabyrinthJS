import React from "react";
import "./Game.css";
// import { Col, Row, Grid, Clearfix } from "react-bootstrap";
import { Col, Row, Container } from "reactstrap";
import Title from "../Title";
import Inventory from "../Inventory";
import Equipment from "../Equipment";
import Statistics from "../Statistics";
import RoomDesc from "../RoomDesc";

const Game = props => (
  <Container >
    <Row className="no-gutters">
      <Col xs={12} md={{size: 9, order: 2}}>
        <Title>Labyrinth.js</Title>
      </Col>
      <Col xs={6} md={{size: 3, order: 1}} className="buttonArea">
        {props.login ? (<button  class="gameButton smButton" onClick={props.handleSaveButton(props.player, props.entities)}>Save Game</button>) : (<button  class="gameButton smButton" onClick={() => props.handleLoginButton(props.login)}>Log In</button>)}
        <button class="gameButton smButton" onClick={props.viewHelpToggle}>Help</button>
      </Col>
      <Col xs={6} md={{size: 3, order: 5}} className="buttonArea">
        <button class="gameButton smButton" onClick={props.viewAboutToggle} >About</button>
        <button class="gameButton smButton" onClick={props.handleQuitButton}>Quit</button>
      </Col>
      <Col xs={12} md={{size: 9, order: 4}}>
        <RoomDesc text={props.textBuffer} />
      </Col>
      <Col xs={12} md={{size: 9, order: 6}}>
        {props.children}
      </Col>
      <Col xs={12} className="d-block d-md-none">
        <button class="gameButton viewCharacterButton" onClick={props.viewCharacterToggle}>Check Yourself</button>
      </Col>
      <Col md={{size: 3, order: 3}} className="d-none d-md-block" >
        <Inventory inventory={props.player.inventory}/>
        <Equipment equipment={props.player.equipment}/>
        <Statistics stats={props.player.stats}/>
      </Col>
    </Row>
  </Container >
);

export default Game;

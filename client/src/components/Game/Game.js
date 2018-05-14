import React from "react";
import "./Game.css";
// import { Col, Row, Grid, Clearfix } from "react-bootstrap";
import { Col, Row, Container } from "reactstrap";
import Title from "../Title.jsx";
import Inventory from "../Inventory.jsx";
import Equipment from "../Equipment.jsx";
import Statistics from "../Statistics.jsx";
import RoomDesc from "../RoomDesc.jsx";
import { Link } from "react-router-dom";

const Game = props => (
  <Container >
    <Row className="no-gutters">
      <Col xs={12} md={{size: 9, order: 2}}>
        <Title>Labyrinth.js</Title>
      </Col>
      <Col xs={6} md={{size: 3, order: 1}} className="buttonArea">
        {props.currentState.authenticated ? (<button  className="gameButton smButton" onClick={props.handleSaveButton(props.currentState)}>Save Game</button>) : (<button className="gameButton smButton" ><Link to="/login">Log In</Link></button>)}
        <button className="gameButton smButton" onClick={props.viewHelpToggle}>Help</button>
      </Col>
      <Col xs={6} md={{size: 3, order: 5}} className="buttonArea">
        <button className="gameButton smButton" onClick={props.viewAboutToggle} >About</button>
        <button className="gameButton smButton"><Link to="/">Quit</Link></button>
      </Col>
      <Col xs={12} md={{size: 9, order: 4}}>
        <RoomDesc text={props.currentState.relay} />
      </Col>
      <Col xs={12} md={{size: 9, order: 6}}>
        {props.children}
      </Col>
      <Col xs={12} className="d-block d-md-none">
        <button className="gameButton viewCharacterButton" onClick={props.viewCharacterToggle}>Check Yourself</button>
      </Col>
      <Col md={{size: 3, order: 3}} className="d-none d-md-block" id="playerArea">
        <Inventory inventory={props.currentState.playerInventory}/>
        <Equipment 
            wielded={props.currentState.wielded} 
            head={props.currentState.head} 
            body={props.currentState.body} 
            arms={props.currentState.arms} 
            legs={props.currentState.legs}
          />
        <Statistics
          health={props.currentState.health}
          attack={props.currentState.attack} 
          defense={props.currentState.defense} 
          moveCount={props.currentState.moveCount}
        />
      </Col>
    </Row>
  </Container >
);

export default Game;

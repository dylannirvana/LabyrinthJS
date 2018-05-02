import React from "react";
import "./Game.css";
import { Col, Row, Grid } from "react-bootstrap";
import Title from "../Title";
import Inventory from "../Inventory";
import Equipment from "../Equipment";
import Statistics from "../Statistics";
import RoomDesc from "../RoomDesc";

const Game = props => (
  <div id="gameArea">
    <Grid>
      {props.isMobile ? (
        <Row className="show-grid">
          <Col xs={12} id="playArea">
            <RoomDesc text={props.textBuffer} />
            {props.children}
          </Col>
          <Col xs={12} id="playerInfo">
            <Row>
              <Col xs={2} className="titleColumn">
                <Title>Labyrinth.js</Title>
              </Col> 
                <Row className="topButtons">
                  <Col xs={6}>
                    <button onClick={props.handleHelpButton}>Help</button>
                  </Col> 
                  <Col xs={6}>
                    {props.login ? (<button onClick={props.handleSaveButton(props.player, props.entities)}>Save Game</button>) : (<button onClick={() => props.handleLoginButton(props.login)}>Log In</button>)}
                  </Col> 
                </Row>
              <Col xs={3} className="invColumn">
                <Inventory inventory={props.player.inventory}/>
              </Col>
              <Col xs={3} className="equipColumn">
                <Equipment equipment={props.player.equipment}/>
              </Col>
              <Col xs={2} className="statsColumn">
                <Statistics stats={props.player.stats}/>
              </Col>
              <Row className="bottomButtons">
                <Col xs={2}>
                  <button onClick={props.handleAboutButton}>About</button>
                </Col>
                <Col xs={2}>
                  <button onClick={props.handleQuitButton}>Quit</button>
                </Col>
              </Row>
            </Row>
          </Col>
        </Row>
      ) : (
        <Row className="show-grid">
          <Col sm={3} id="playerInfo">
            <Row>
              <Col sm={12} className="titleColumn">
                <Title>Labyrinth.js</Title>
              </Col> 
                <Row className="topButtons">
                  <Col sm={6}>
                    <button onClick={props.handleHelpButton}>Help</button>
                  </Col> 
                  <Col sm={6}>
                    {props.login ? (<button onClick={props.handleSaveButton(props.player, props.entities)}>Save Game</button>) : (<button onClick={() => props.handleLoginButton(props.login)}>Log In</button>)}
                  </Col> 
                </Row>
              <Col sm={12} className="invColumn">
                <Inventory inventory={props.player.inventory}/>
              </Col>
              <Col sm={12} className="equipColumn">
                <Equipment equipment={props.player.equipment}/>
              </Col>
              <Col sm={12} className="statsColumn">
                <Statistics stats={props.player.stats}/>
              </Col>
              <Row className="bottomButtons">
                <Col sm={6}>
                  <button onClick={props.handleAboutButton}>About</button>
                </Col>
                <Col sm={6}>
                  <button onClick={props.handleQuitButton}>Quit</button>
                </Col>
              </Row>
            </Row>
          </Col>
          <Col sm={9} id="playArea">
            <RoomDesc text={props.textBuffer} />
            {props.children}
          </Col>
        </Row>
      )}

    </Grid>
  </div>
);

export default Game;

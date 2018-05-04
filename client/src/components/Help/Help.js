import React from "react";
import "./Help.css";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

const Help = (props) => (
  <Modal isOpen={props.viewHelp} toggle={props.viewHelpToggle} className="helpModal">
    <ModalHeader toggle={props.viewHelpToggle}>Instructions</ModalHeader>
    <ModalBody>
      <p>Provide instructions here.</p>
      <h4>Movement</h4>
      <p>Move to another room by typing a direction. Exits are (usually) listed in the room description, but don't take it as gospel!</p>
      <ul>
        <lh>Example move commands:</lh>
        <li>walk east</li>
        <li>go e</li>
        <li>northwest</li>
        <li>nw</li>
        <li>u</li>
        <li>up</li>
        <li>walk south west</li>
      </ul>
      <h4>Interaction</h4>
      <p>interaction instructions</p>
      <ul>
        <lh>Example interactions:</lh>
        <li></li>
      </ul>
      <h4>Hints</h4>
      <p></p>
      <ul>
        <li>The Minotaur is rather large; you might discover some portals won't accomodate the Beast.</li>
      </ul>
    </ModalBody>
  </Modal>
);

export default Help;

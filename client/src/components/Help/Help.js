import React from "react";
import "./Help.css";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const Help = (props) => (
  <Modal isOpen={props.viewHelp} toggle={props.viewHelpToggle} className="helpModal">
    <ModalHeader toggle={props.viewHelpToggle}>Instructions</ModalHeader>
    <ModalBody>
      <p>Provide instructions here.</p>
    </ModalBody>
    <ModalFooter>
      <Button onClick={props.viewHelpToggle}>Close</Button>
    </ModalFooter>
  </Modal>
);

export default Help;

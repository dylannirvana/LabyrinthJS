import React from "react";
import "./About.css";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const About = (props) => (
  <Modal isOpen={props.viewAbout} toggle={props.viewAboutToggle} className="aboutModal">
    <ModalHeader toggle={props.viewAboutToggle}>About</ModalHeader>
    <ModalBody>
      <p>Talk about this here.</p>
    </ModalBody>
    <ModalFooter>
      <Button onClick={props.viewAboutToggle}>Close</Button>
    </ModalFooter>
  </Modal>
);

export default About;

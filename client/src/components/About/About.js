import React from "react";
import "./About.css";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

const About = (props) => (
  <Modal isOpen={props.viewAbout} toggle={props.viewAboutToggle} className="aboutModal">
    <ModalHeader toggle={props.viewAboutToggle}>About</ModalHeader>
    <ModalBody>
      <p>Talk about this here.</p>
    </ModalBody>
  </Modal>
);

export default About;

import React from "react";
import "./Equipment.css";

const Equipment = props => (
  <div id="equipment">
    <h2>Equipment</h2>
    <p>Wielded: {props.wielded}</p>
    <p>Head: {props.head}</p>
    <p>Body: {props.body}</p>
    <p>Arms: {props.arms}</p>
    <p>Legs: {props.legs}</p>
  </div>
);

export default Equipment;
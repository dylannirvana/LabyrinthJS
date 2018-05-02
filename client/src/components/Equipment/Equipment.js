import React from "react";
import "./Equipment.css";

const Equipment = props => (
  <div id="equipment">
    <h2>Equipment</h2>
    <p>Wielded: {props.equipment.wielded}</p>
    <p>Head: {props.equipment.head}</p>
    <p>Body: {props.equipment.body}</p>
    <p>Arms: {props.equipment.arms}</p>
    <p>Legs: {props.equipment.legs}</p>
  </div>
);

export default Equipment;
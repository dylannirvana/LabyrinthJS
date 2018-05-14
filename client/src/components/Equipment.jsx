import React from "react";

const Equipment = props => (
  <div id="equipment">
    <h2>Equipment</h2>
    <p>Wielded: {props.wielded ? props.wielded : ("Nothing")}</p>
    <p>Head: {props.head ? props.head : ("Nothing")}</p>
    <p>Body: {props.body ? props.body : ("Nothing")}</p>
    <p>Arms: {props.arms ? props.arms : ("Nothing")}</p>
    <p>Legs: {props.legs ? props.legs : ("Nothing")}</p>
  </div>
);

export default Equipment;
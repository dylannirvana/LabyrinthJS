import React from "react";
import "./Inventory.css";

// const subtitleStyle = {
//   textAlign: "center"
// }

const Inventory = props => (
  <div id="inventory">
    <p>You are carrying:</p>
    {props.inventory}
  </div>
);

export default Inventory;
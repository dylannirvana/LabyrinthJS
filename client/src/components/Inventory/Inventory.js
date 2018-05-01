import React from "react";
import "./Inventory.css";

const Inventory = props => (
  <div id="inventory">
    <h2>Carrying</h2>
      {props.inventory.map((item) => {
        if (item.quantity === undefined) {
          return (
            <p>{item.shortName}</p>
          )
        } else {
          return (
            <p>{item.shortName} ({item.quantity})</p>
          )
        }
      })}
  </div>
);

export default Inventory;
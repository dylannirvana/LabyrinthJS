import React from "react";

const showInventory = (inv) => {
  console.log("Inventory.jsx => showInventory() => inv =", inv);
  if (inv.length === 0) {
    return (
      <p>Nothing.</p>
    )
  } else {
    return (
      inv.map((item, i) => {
        if (item.quantity === undefined) {
          return (
            <p key={i}>{item.shortName}</p>
          )
        } else {
          return (
            <p>{item.shortName} ({item.quantity})</p>
          )
        }
      })
    )
  }
}

const Inventory = props => (
  <div id="inventory">
    <h2>Carrying</h2>
    {showInventory(props.inventory)}
  </div>
);

export default Inventory;
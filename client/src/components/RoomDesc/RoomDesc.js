import React from "react";
import "./RoomDesc.css";

const RoomDesc = props => (
  <div id="roomDesc">
    {props.text.map((obj, i) => (
      <p key={i}>{obj}</p>
    ))}
  </div>
);

export default RoomDesc;
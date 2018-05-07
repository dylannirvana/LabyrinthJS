import React from "react";

const RoomDesc = props => (
  <div id="roomDesc" className="flex-grow">
    {props.text.map((obj, i) => (
      <p key={i}>{obj}</p>
    ))}
  </div>
);

export default RoomDesc;
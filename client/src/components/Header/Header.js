import React from "react";
import "./Header.css";

const centeredStyle = {
  textAlign: "center"
}
const Header = props => (
  <div id="header">
    <h1 style={centeredStyle}>Labyrinth.js</h1>
    {props.children}
  </div>
);

export default Header;
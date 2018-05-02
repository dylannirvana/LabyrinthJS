import React from "react";
import "./Title.css";

const centeredStyle = {
  textAlign: "center"
}
const Title = props => (
  <div id="header">
    <h1 style={centeredStyle}>{props.children}</h1>
  </div>
);

export default Title;
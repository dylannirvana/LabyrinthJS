import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from 'react-router-dom'
import "./NavTabs.css";

// function handleSelect(selectedKey) {
//   alert(`selected ${selectedKey}`);
// }
// onSelect={handleSelect}

const NavTabs = () => (
  <Nav bsStyle="pills" >
    <NavLink
      to="/about"
      activeStyle={{
        fontWeight: 'bold',
        color: 'red'
      }}
    >About</NavLink>
    <NavLink
      to="/game"
      activeStyle={{
        fontWeight: 'bold',
        color: 'red'
      }}
    >Game</NavLink>
    <NavLink
      to="/help"
      activeStyle={{
        fontWeight: 'bold',
        color: 'red'
      }}
    >Help</NavLink>
  </Nav>
);

export default NavTabs;

import React from "react";

const HomePage = props => (
  
  <div id="startScreen">
    <button className="gameButton smButton" onClick={() => props.handleLoginButton(this.state.login)}><Link to="/login">Log in</Link></button>
    <button className="gameButton smButton" onClick={() => props.handleNewGameButton()}>Start New Game</button>
  </div>

)

export default HomePage;
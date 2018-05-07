import React, { Component } from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/Auth";
import DashboardPage from "../pages/DashboardPage";
import LogoutFunction from "../pages/LogoutFunction";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";

class HomePage extends Component {

  state = {
    showLoginForm: false,
    showSignUpForm: false,
  };

  render() {
    return (
      <div id="startScreen">
        {!this.props.authenticated ? (
          <DashboardPage />
        ) : (
          <div>
            <button className="gameButton smButton" onClick={() => this.setState({ showLoginForm: !this.state.showLoginForm })}>Log in</button>
            {this.state.showLoginForm ? (
              <LoginPage toggleAuthenticateStatus={this.toggleAuthenticateStatus} />
              ) : (
              <div></div>
            )}
            <button className="gameButton smButton" onClick={() => this.setState({ showSignUpForm: !this.state.showSignUpForm })}>Sign Up</button>
            {this.state.showSignUpForm ? (
              <SignUpPage />
              ) : (
              <div></div>
            )}
          </div>
        )}
        <button className="gameButton smButton"><Link to="/game">Start New Game</Link></button>
      </div>
    )
  }
}

export default HomePage;
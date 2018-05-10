import React, { Component } from "react";
import injectTapEventPlugin from 'react-tap-event-plugin';

// theme modules
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import GamePage from './pages/GamePage.jsx';
import HomePage from './pages/GamePage.jsx';

import { 
  PrivateRoute, 
  PropsRoute, 
  LoggedOutRoute 
} from './components/Routes';

// user auth components
import LoginPage from './pages/LoginPage.jsx';
import LogoutFunction from './pages/LogoutFunction.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';

import Auth from './utils/Auth';

import Wrapper from "./components/Wrapper/Wrapper";

// remove tap delay, essential for MaterialUI to work properly
injectTapEventPlugin();

// let Item = require("./Objects/ItemBuilder");
// let Creature = require("./Objects/CreatureBuilder");
// let Room = require("./Objects/RoomBuilder");
// let newGameData = {
//   moveCount: 0,
//   player: {
//     location: ["two"],
//     equipment: {
//       wielded: undefined,
//       head: undefined,
//       body: undefined,
//       arms: undefined,
//       legs: undefined
//     },
//     inventory: [Item.cellPhone],
//     stats: {
//       health: 100,
//       attack: 0,
//       defense: 3
//     },
//     options: {
//       verbose: true,
//     }
//   },
//   room: Room,
//   creatures: [Creature.cat, Creature.minotaur],
//   textBuffer: []
// };

class App extends Component {

  state = {
    userCommand: "",
    authenticated: false,
    loadData: undefined
  }

  // *
  // * BUTTON HANDLING
  // *

  handleNewGameButton = () => {
    console.log("New Game button firing");
    this.setState({
      inProgress: true,
      loadData: undefined
    })
  }

  handleQuitButton = () => {
    console.log("Quit button firing");
    this.setState({
      inProgress: false,
      loadData: undefined
    })
  }

  handleLoginButton = () => {
    console.log("Login button firing");
  }

  handleLogoutButton = data => {
    console.log("Logout button firing");
  }

  handleLoadGame = data => {

  }

  // *
  // * HANDLE USER AUTHENTICATION
  // *

  toggleAuthenticateStatus = () => {
    // check authenticated status and toggle state based on that
    this.setState({ authenticated: Auth.isUserAuthenticated() })
  }

  componentDidMount() {
    // check if user is logged in on refresh
    this.toggleAuthenticateStatus()
  }

  // showGame() {
  //   if (this.state.inProgress === true) {
  //     return (
  //       <GamePage 
  //         toggleAuthenticateStatus={this.toggleAuthenticateStatus}

  //       />
  //     )
  //   } else {
  //     return (
  //       <div id="startScreen">
  //         {/* <div className="buttonArea"> */}
  //         {/* ASYNC DIFFICULTY HERE */}
  //           {this.state.authenticated ? (
  //             <div>
  //             </div>
  //           ) : (
  //             <button className="gameButton smButton" onClick={() => this.handleLoginButton(this.state.login)}><Link to="/login">Log in</Link></button>
  //           )}
  //         {/* </div> */}
  //         <button className="gameButton smButton" onClick={() => this.handleNewGameButton()}>Start New Game</button>
  //       </div>
  //     )
  //   }
  // }
  
  render() {
    return (
      <Wrapper>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <Router>
            <div>
              {/* {this.showGame()}        */}
              {this.state.authenticated ? (
                <div className="top-bar-right">
                  <Link to="/dashboard">Dashboard</Link>
                  <Link to="/logout">Log out</Link>
                </div>
              ) : (
                <div className="top-bar-right">
                  <Link to="/login">Log in</Link>
                  <Link to="/signup">Sign up</Link>
                </div>
              )}
              <PropsRoute exact path="/game" component={GamePage}
                // gameData={newGameData}
                toggleAuthenticateStatus={this.toggleAuthenticateStatus}
                handleQuitButton={this.handleQuitButton.bind(this)}
                handleLoginButton={this.handleLoginButton} 
                loadData={this.loadData} />
              <PropsRoute exact path="/" component={HomePage}
                toggleAuthenticateStatus={this.toggleAuthenticateStatus.bind()}
                handlenewGameButton={this.handleNewGameButton} 
                handleLoadGame={this.handleLoadGame.bind(this)}
                handleLoginButton={this.handleLoginButton.bind(this)} 
                handleLogoutButton={this.handleLogoutButton} />
              <PrivateRoute path="/dashboard" component={DashboardPage}/>
              <LoggedOutRoute path="/login" component={LoginPage} toggleAuthenticateStatus={this.toggleAuthenticateStatus} />
              <LoggedOutRoute path="/signup" component={SignUpPage}/>
              <Route path="/logout" component={LogoutFunction}/>
            </div>
          </Router>
        </MuiThemeProvider>
      </Wrapper>
    )
  };

  // integrate this
  // render() {
  //   return (
  //     <MuiThemeProvider muiTheme={getMuiTheme()}>
  //       <Router>
  //         <div>
  //           <div className="top-bar">
  //             <div className="top-bar-left">
  //               <Link to="/">React App</Link>
  //             </div>
  //             {this.state.authenticated ? (
  //               <div className="top-bar-right">
  //                 <Link to="/dashboard">Dashboard</Link>
  //                 <Link to="/logout">Log out</Link>
  //               </div>
  //             ) : (
  //               <div className="top-bar-right">
  //                 <Link to="/login">Log in</Link>
  //                 <Link to="/signup">Sign up</Link>
  //               </div>
  //             )}
  
  //           </div>
  
  //           <PropsRoute exact path="/" component={HomePage} toggleAuthenticateStatus={this.toggleAuthenticateStatus} />
  //           <PrivateRoute path="/dashboard" component={DashboardPage}/>
  //           <LoggedOutRoute path="/login" component={LoginPage} toggleAuthenticateStatus={this.toggleAuthenticateStatus} />
  //           <LoggedOutRoute path="/signup" component={SignUpPage}/>
  //           <Route path="/logout" component={LogoutFunction}/>
  //         </div>
  
  //       </Router>
  //     </MuiThemeProvider>
  //   )
  // }

}


export default App;

import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import "./App.css";
import Wrapper from "./components/Wrapper/Wrapper";
import NavTabs from "./components/NavTabs/NavTabs";
import About from "./components/pages/About/About";
import Game from "./components/pages/Game/Game";
import Help from "./components/pages/Help/Help";
import Header from "./components/Header";

class App extends Component {
  render() {
    return (
      <Router>
        <Wrapper>
          <Header>
            <NavTabs />
          </Header>
          <Route exact path='/' render={() => <Redirect to="/about" />} />
          <Route exact path="/about" component={About} />
          <Route exact path="/game" component={Game} />
          <Route exact path="/help" component={Help} />
        </Wrapper>
      </Router>
    );
  }
}

export default App;

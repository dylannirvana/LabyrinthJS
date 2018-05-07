import React from 'react';
import Auth from '../utils/Auth';
import Dashboard from '../components/Dashboard.jsx';
import API from '../utils/API';

class DashboardPage extends React.Component {
  state = {
    secretData: '',
    user: {},
    savedGames: []
  }

  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {
    API.dashboard(Auth.getToken())
    .then(res => {
      this.setState({
          secretData: res.data.message,
          user: res.data.user
        });
    })
  }

  // displaySavedGames = () => {
  //   {this.state.savedGames.length ? (
  //     this.state.savedGames.map(ele => (
  //       <button className="gameButton smButton" onClick={() => this.handleLoadGame(this.state.user)}>Load Game</button>
  //     ))
  //   ) : (
  //     <p>You have no saved games.</p>
  //   )}
  // };
  
  /**
   * Render the component.
   */
  render() {
    return (
      <Dashboard secretData={this.state.secretData} user={this.state.user} />
    )
  }
}

export default DashboardPage;
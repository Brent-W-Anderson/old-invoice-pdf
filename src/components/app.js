import React from 'react';

import LoginSignUp from './login-signup/login-signup';
import Navigation from './navigation/navigation';
import UsersJSON from '../data/users.json'; // some test data for now. going to connect a database later.
import '../styles/app.css';

export default class App extends React.Component {
  state = {
    loggedIn: false,
    users: UsersJSON
  };

  login = () => {
    this.setState({
      loggedIn: true
    });
  };

  render() {
    let app = this.state;

    if(app.loggedIn) {
      return (
        <div className="app">
          <Navigation />
        </div>
      );
    }else {
      return (
        <div className="app">
          <LoginSignUp
            login={this.login}
            users={app.users}
          />
        </div>
      );
    }
  }
}

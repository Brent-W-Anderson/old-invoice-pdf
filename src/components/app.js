import React from 'react';

import LoginSignUp from './login-signup/login-signup';
import Navigation from './navigation/navigation';
import Pages from './pages/pages';
import UsersJSON from '../data/users.json'; // some test data for now. going to connect a database later.
import '../styles/app.css';

export default class App extends React.Component {
  state = {
    loggedIn: true,
    activeUser: "The King",
    activePage: "invoices",
    users: UsersJSON
  };

  login = (name) => {
    let user = this;
    // let username = name;

    setTimeout(function() {
      user.setState({
        loggedIn: true,
        activeUser: name
      });
    }, 1000);
  };

  setActivePage = (page) => {
    let pageName = page.target.innerHTML.toLowerCase().replace(/\s/g, '');

    this.setState({
      activePage: pageName
    });
  }

  render() {
    let app = this.state;

    if(app.loggedIn) {
      return (
        <div className="app">
          <Navigation
            activeUser={app.activeUser}
            setActivePage={this.setActivePage}
          />
          <Pages
            activePage={app.activePage}
          />
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

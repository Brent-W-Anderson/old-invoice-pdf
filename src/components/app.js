import React from 'react';

import LoginSignUp from './login-signup/login-signup';
import Navigation from './navigation/navigation';
import Pages from './pages/pages';
import UsersJSON from '../data/users.json'; // some test data for now. going to connect a database later.
import AppJSON from '../data/app.json';
import '../styles/app.css';

export default class App extends React.Component {
  state = {
    loggedIn: false,
    transitionOut: false,
    activeUser: "The King",
    activePage: "invoices",
    users: UsersJSON,
    appData: AppJSON
  };

  login = (username) => {
    let user = this;

    this.setState({
      transitionOut: false
    });

    setTimeout(function() {
      user.setState({
        loggedIn: true,
        activeUser: username
      });
    }, 1000);
  };

  logout = () => {
    let user = this;

    this.setState({
      transitionOut: true
    });

    setTimeout(function() {
      user.setState({
        loggedIn: false,
        activeUser: ""
      });
    }, 1250);
  }

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
            appData={app.appData}
            logout={this.logout}
          />
          <Pages
            activePage={app.activePage}
            appData={app.appData}
            loggedIn={app.transitionOut}
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

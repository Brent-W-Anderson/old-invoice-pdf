import React from 'react';

//components
import LoginSignUp from './login-signup/login-signup';
import Navigation from './navigation/navigation';
import Pages from './pages/pages';

//data
import UsersJSON from '../data/users.json'; // some test data for now. going to connect a database later.
import AppJSON from '../data/app.json';

//styling
import 'fontsource-roboto';
import '../styles/app.css';

export default class App extends React.Component {
  state = {
    loggedIn: false,
    transitionOut: false,
    activeUser: "The King",
    activePage: "invoices",
    userData: {},
    users: UsersJSON,
    appData: AppJSON
  };

  login = (userData) => {
    let user = this;
    let username = userData.personalInfo.name;

    this.setState({
      userData: userData,
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
        activePage: "invoices",
        activeUser: ""
      });
    }, 1500);
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
            activePage={app.activePage}
            appData={app.appData}
            logout={this.logout}
          />
          <Pages
            activePage={app.activePage}
            appData={app.appData}
            transitionOut={app.transitionOut}
            userData={app.userData}
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

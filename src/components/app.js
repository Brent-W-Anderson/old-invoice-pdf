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
    invoiceMode: "view",
    userData: {},
    users: UsersJSON,
    appData: AppJSON
  };

  setActiveModeView = () => { // viewmode for the invoices utility buttons.
    this.setState({
      invoiceMode: "view"
    });
  }

  setActiveModeEdit = () => { // viewmode for the invoices utility buttons.
    this.setState({
      invoiceMode: "edit"
    });
  }

  login = (userData) => { // login and store the users data for component use.
    let user = this;
    let username = userData.personalInfo.name;

    this.setState({
      userData: userData,
      transitionOut: false
    });

    setTimeout(function() { // let the app animate out before logging in.
      user.setState({
        loggedIn: true,
        activeUser: username
      });
    }, 1000);
  };

  logout = () => { // logout and reset the users data.
    let user = this;

    this.setState({
      transitionOut: true
    });

    setTimeout(function() { // let the app animate out before logging out.
      user.setState({
        loggedIn: false,
        userData: {},
        activePage: "invoices",
        invoiceMode: "view",
        activeUser: ""
      });
    }, 1500);
  }

  setActivePage = (page) => { // changing tabs
    let pageName = page.target.innerHTML.toLowerCase().replace(/\s/g, '');
    let app = this;

    if(pageName !== "invoices") { // change view mode back to defaults if not within invoices.
      setTimeout(function() {
        app.setActiveModeView();
      }, 500);
    }else {
      app.setActiveModeView();
    };

    this.setState({
      activePage: pageName
    });
  };

  render() {
    let app = this.state;

    if(app.loggedIn) { // if logged in
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
            setActiveModeView={this.setActiveModeView}
            setActiveModeEdit={this.setActiveModeEdit}
            invoiceMode={app.invoiceMode}
            activePage={app.activePage}
            appData={app.appData}
            transitionOut={app.transitionOut}
            userData={app.userData}
          />
        </div>
      );
    }else { // if not logged in
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

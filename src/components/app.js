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
    loggedIn: false, // set to true to bypass logging in.
    transitionOut: false,
    activeUser: "", // can put whatever name you want here if loggedIn is set to true.
    activePage: "invoices",
    invoiceMode: "view",
    userData: {}, // set to the specific array index from the users if looking for some sample data.
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


  modifyInvoice = (userData, invoiceIdx, clientIdx) => (inputSelected) => { // editing specific invoice data and storing it back in state
    /*
      Make sure to add specific invoice details separate from personal info details for future updates.
    */
    const targetID = inputSelected.target.id;

    let activeUser = this.state.activeUser;
    let newVal = inputSelected.target.value;
    let newUserData = userData;

    switch(targetID) { // which input would you like to modify?
      case "invoiceNum":
        newUserData.invoices[invoiceIdx].invoiceNum = newVal;
        break;

      case "billToName":
        newUserData.clients[clientIdx].name = newVal;
        break;

      case "fromName":
        newUserData.personalInfo.name = newVal;
        activeUser = newVal;
        break;

      case "date":
        newUserData.invoices[invoiceIdx].date = newVal;
        break;

      case "amountBilled": // need to change this to a floating # because of the way the input fields work with numbers.
        (newVal > 0 ?
          newUserData.invoices[invoiceIdx].amountBilled = parseFloat(newVal) :
          newUserData.invoices[invoiceIdx].amountBilled = 0);
        break;

      case "balanceDue": // need to change this to a floating # because of the way the input fields work with numbers.
        (newVal > 0 ?
          newUserData.invoices[invoiceIdx].balanceDue = parseFloat(newVal) :
          newUserData.invoices[invoiceIdx].balanceDue = 0);
        break;

      default:
        console.log("something went wrong... selected target input:");
        console.log(targetID);
    }

    this.setState({
      activeUser: activeUser,
      userData: newUserData
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
            modifyInvoice={this.modifyInvoice}
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

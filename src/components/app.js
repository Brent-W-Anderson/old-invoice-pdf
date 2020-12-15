import React from 'react';
import Moment from 'moment';

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
    invoiceMode: "view", // dont change this unless you want to start with a specific manageable invoice.
    userData: {}, // set to the specific array index from the users if looking for some sample data.
    users: UsersJSON,
    appData: AppJSON
  };

  setActiveModeView = (clicked) => { // view all of the invoices
    this.setState({
      invoiceMode: "view"
    });
  }

  setActiveModeEdit = () => { // view a specific manageable/ editable invoice
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
      app.setActiveModeView("invoices");
    };

    this.setState({
      activePage: pageName
    });
  };


  createInvoice = idx => {
    let template = JSON.parse(JSON.stringify(UsersJSON[0].invoices[0]));
          template.invoiceID = idx + 1;
          template.date = Moment(new Date()).format("YYYY-MM-DD");


    this.setState(prevState => ({
      userData: {
        ...prevState.userData,
        invoices: [
          ...prevState.userData.invoices, template
        ]
      }
    }));
  };


  modifyInvoice = (userData, invoiceIdx, clientIdx, otherInputSelected, otherData, itemIdx) => (inputSelected) => { // editing specific invoice data and storing it back in state
    const app = this;
    let targetID, newVal;

    if(inputSelected !== undefined) {
      targetID = inputSelected.target.id;
      newVal = inputSelected.target.value;
    }else {
      switch(otherInputSelected) {
        case "billToEmail":
          targetID = otherInputSelected;
          newVal = otherData;
          break;

        case "fromEmail":
          targetID = otherInputSelected;
          newVal = otherData;
          break;

        default:
          console.warn("no other input selected to save to app state.");
      };
    }

    let newUserData = this.state.userData;

    function overwriteState() {
      app.setState({
        userData: newUserData
      });
    }

    switch(targetID) { // which input would you like to modify?
      case "invoiceName":
        newUserData.invoices[invoiceIdx].invoiceName = newVal;
        overwriteState();
        break;

      // BILL TO

      case "billToName":
        newUserData.invoices[invoiceIdx].toName = newVal;
        overwriteState();
        break;

      case "billToEmail":
        newUserData.invoices[invoiceIdx].toEmail = newVal;
        overwriteState();
        break;

      case "billToStreet":
        newUserData.invoices[invoiceIdx].toAddress.street = newVal;
        overwriteState();
        break;

      case "billToCityState":
        newUserData.invoices[invoiceIdx].toAddress.cityState = newVal;
        overwriteState();
        break;

      case "billToZip":
        newUserData.invoices[invoiceIdx].toAddress.zip = newVal;
        overwriteState();
        break;

      case "billToPhone":
        newUserData.invoices[invoiceIdx].toPhone = newVal;
        overwriteState();
        break;

      // FROM

      case "fromName":
        newUserData.invoices[invoiceIdx].fromName = newVal;
        overwriteState();
        break;

      case "fromEmail":
        newUserData.invoices[invoiceIdx].fromEmail = newVal;
        overwriteState();
        break;

      case "fromStreet":
        newUserData.invoices[invoiceIdx].fromAddress.street = newVal;
        overwriteState();
        break;

      case "fromCityState":
        newUserData.invoices[invoiceIdx].fromAddress.cityState = newVal;
        overwriteState();
        break;

      case "fromZip":
        newUserData.invoices[invoiceIdx].fromAddress.zip = newVal;
        overwriteState();
        break;

      case "fromPhone":
        newUserData.invoices[invoiceIdx].fromPhone = newVal;
        overwriteState();
        break;

      // DETAILS

      case "date":
        newUserData.invoices[invoiceIdx].date = newVal;
        overwriteState();
        break;

      case "number":
        // swapping ID's
        newUserData.invoices[invoiceIdx].invoiceID = newVal;
        newUserData.invoices[parseInt(newVal) - 1].invoiceID = invoiceIdx + 1;
        overwriteState();
        break;

      // ITEMS

      case "description":
        newUserData.invoices[invoiceIdx].items[itemIdx].description = newVal;
        overwriteState();
        break;

      case "rate":
        if(newVal <= 0) {
          newUserData.invoices[invoiceIdx].items[itemIdx].rate = "";
          newUserData.invoices[invoiceIdx].amountBilled = null;
          newUserData.invoices[invoiceIdx].balanceDue = null;
        }else {
          newUserData.invoices[invoiceIdx].items[itemIdx].rate = newVal;
          newUserData.invoices[invoiceIdx].amountBilled = newVal * newUserData.invoices[invoiceIdx].items[itemIdx].qty;
          newUserData.invoices[invoiceIdx].balanceDue = newVal * newUserData.invoices[invoiceIdx].items[itemIdx].qty;
        }
        overwriteState();
        break;

      case "qty":
        if(newVal <= 0) {
          newUserData.invoices[invoiceIdx].items[itemIdx].qty = "";
          newUserData.invoices[invoiceIdx].amountBilled = null;
          newUserData.invoices[invoiceIdx].balanceDue = null;
        }else {
          newUserData.invoices[invoiceIdx].items[itemIdx].qty = newVal;
          newUserData.invoices[invoiceIdx].amountBilled = newVal * newUserData.invoices[invoiceIdx].items[itemIdx].rate;
          newUserData.invoices[invoiceIdx].balanceDue = newVal * newUserData.invoices[invoiceIdx].items[itemIdx].rate;
        }
        overwriteState();
        break;

      case "additionalDetails":
        newUserData.invoices[invoiceIdx].items[itemIdx].additionalDetails = newVal;
        overwriteState();
        break;

      default:
        console.warn("something went wrong... selected target input:");
        console.warn(targetID);
    }
  };


  deleteInvoice = (invoice, idx) => { // deletes an invoice
    let newUserData = this.state.userData;
    newUserData.invoices.splice(idx, 1);

    for(var x = 0; x < newUserData.invoices.length; x++) {
      newUserData.invoices[x].invoiceID = (x + 1).toString();
    }

    this.setState({
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
            createInvoice={this.createInvoice}
            modifyInvoice={this.modifyInvoice}
            deleteInvoice={this.deleteInvoice}
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

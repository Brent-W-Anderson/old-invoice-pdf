import React from 'react';

import Invoices from './invoices/invoices';
import Clients from './clients/clients';
import Settings from './settings/settings';

import '../../styles/pages/pages.css';

export default class Pages extends React.Component {

  isActivePageSelected = (pageName) => {
    const { activePage } = this.props;
    let shortPageName = pageName.substring(0, 12);

    if (pageName.length > 12) {
      shortPageName += "...";
    };

    if (shortPageName === activePage) {
      return " selected";
    };

    return "";
  };


  buildPages = (page, idx) => {
    let pageName = page.name.toLowerCase();

    return(
      <div key={idx} className={`page${this.isActivePageSelected(`${pageName}`)}`}>
        <div className="container">
          {this.buildPage(pageName, page.data)}
        </div>
      </div>
    );

  };


  buildPage = (pageName, pageData) => {
    const { userData, invoiceMode, setActiveModeView, setActiveModeEdit, createInvoice, modifyInvoice,
            deleteInvoice } = this.props;

    switch(pageName) {
      case "invoices":
        return (
          <Invoices
            setActiveModeView={setActiveModeView}
            setActiveModeEdit={setActiveModeEdit}
            invoiceMode={invoiceMode}
            pageData={pageData}
            userData={userData}
            createInvoice={createInvoice}
            modifyInvoice={modifyInvoice}
            deleteInvoice={deleteInvoice}
          />
        );

      case "clients":
        return (
          <Clients pageData={pageData} />
        );

      case "settings":
        return (
          <Settings pageData={pageData} />
        );

      default:
        return (
          <p> {pageData.info} </p>
        );
    };

  };


  render() {
    const { appData, transitionOut } = this.props;

    return (
      <div className={`pages${transitionOut === true ? " pagesFadeOut" : ""}`}>
        {appData.map(this.buildPages)}
      </div>
    );
  };

};

import React from 'react';

import '../../../styles/pages/invoices/invoices.css';

export default class Invoices extends React.Component {
  state = {
    activeButton: "invoices",
    mode: "view",
    selectedInvoiceID: null
  };

  handleActiveBtn = btnPressed => () => {
    this.setState({
      activeButton: btnPressed
    });
  };

  manageInvoice = invoice => () => {
    this.setState({
      mode: "edit",
      selectedInvoiceID: parseInt(invoice.invoiceID) - 1
    });
  };

  viewAll = () => {
    this.setState({
      mode: "view"
    });
  };

  buildManageableInvoice = () => {
    const { userData } = this.props;

    const invoiceIdx = this.state.selectedInvoiceID;
    const invoice = userData.invoices[invoiceIdx];

    const clientIdx = parseInt(invoice.clientID) - 1;
    const client = userData.clients[clientIdx];

    return (
      <div>
        <h1> Edit selected invoice here: </h1>

        <ul>
          <li> {`INV ${invoice.invoiceID}`} </li>
          <li> {`Client: ${client.name}`} </li>
          <li> {`Date: ${invoice.date}`} </li>
          <li> {`Balance: ${invoice.balance}`} </li>
        </ul>

        <button onClick={this.viewAll}> Back </button>
      </div>
    );
  };

  buildInvoiceList = (invoice, idx) => {
    const { userData } = this.props;
    const clientID = parseInt(invoice.clientID) - 1;
    const clientName = userData.clients[clientID].name;

    if(this.state.activeButton === "invoices") {
      return (
        <tr key={idx} className="invoice-line" onClick={this.manageInvoice(invoice)}>
          <td> {`INV ${invoice.invoiceID}`} </td>
          <td> {clientName} </td>
          <td> {invoice.date} </td>
          <td> {`$${invoice.balance}`} </td>
        </tr>
      );
    }

    if(this.state.activeButton === "paid" && invoice.balance === 0) {
      return (
        <tr key={idx} className="invoice-line" onClick={this.manageInvoice(invoice)}>
          <td> {`INV ${invoice.invoiceID}`} </td>
          <td> {clientName} </td>
          <td> {invoice.date} </td>
          <td> {`$${invoice.balance}`} </td>
        </tr>
      );
    }

    if(this.state.activeButton === "unpaid" && invoice.balance > 0) {
      return (
        <tr key={idx} className="invoice-line" onClick={this.manageInvoice(invoice)}>
          <td> {`INV ${invoice.invoiceID}`} </td>
          <td> {clientName} </td>
          <td> {invoice.date} </td>
          <td> {`$${invoice.balance}`} </td>
        </tr>
      );
    }

  };

  render() {
    const { pageData, userData } = this.props;
    const invoice = this.state;

    if(invoice.mode === "view") {
      return (
        <div className="invoices">
          <div className="utility-bar">
            <div
              className={`button invoices${invoice.activeButton === "invoices" ? " selected" : ""}`}
              onClick={this.handleActiveBtn("invoices")}
            > All Inoivces </div>

            <div
              className={`button paid${invoice.activeButton === "paid" ? " selected" : ""}`}
              onClick={this.handleActiveBtn("paid")}
            > Paid </div>

            <div
              className={`button unpaid${invoice.activeButton === "unpaid" ? " selected" : ""}`}
              onClick={this.handleActiveBtn("unpaid")}
            > UnPaid </div>

            <div className="button new-inv"> New Invoice ( <span className="inner">+</span> ) </div>
          </div>

          <div className="invoice-list">
            <table>
              <colgroup>
                 <col span="1" style={{width: "30%"}}></col>
                 <col span="1" style={{width: "25%"}}></col>
                 <col span="1" style={{width: "25%"}}></col>
                 <col span="1" style={{width: "20%"}}></col>
              </colgroup>

              <thead>
                <tr>
                  <th> Invoice #: </th>
                  <th> Client: </th>
                  <th> Date: </th>
                  <th> $ Balance Due: </th>
                </tr>
              </thead>

              <tbody>
                {userData.invoices !== undefined ? userData.invoices.map(this.buildInvoiceList) : null}
              </tbody>
            </table>
          </div>

          <p> {pageData.info} </p>
        </div>
      );
    }

    if(invoice.mode === "edit") {
      return (
        <div className="edit-invoice">
          {this.buildManageableInvoice()}
        </div>
      );
    };

  };
};

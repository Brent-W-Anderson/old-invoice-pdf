import React from 'react';

import '../../../styles/pages/invoices/invoices.css';

export default class Invoices extends React.Component {

  state = {
    activeButton: "allInvoices",
    mode: "view",
    selectedInvoiceID: null
  };


  handleActiveBtn = btnPressed => () => {// stores the selected button so selectInvoiceList knows which list to return.
    this.setState({
      activeButton: btnPressed
    });
  };


  saveSelectedInvoice = invoice => () => { // stores the selected invoice so it knows which one to use in buildManageableInvoice.
    this.setState({
      selectedInvoiceID: parseInt(invoice.invoiceID) - 1
    });

    this.props.setActiveModeEdit();
  };


  buildManageableInvoice = () => { // shows an invoice and it's individual properties (possible added functionality for new invoices)
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

        <button onClick={this.props.setActiveModeView}> Back </button>
      </div>
    );
  };


  createList = (invoice, idx) => { // shows a list item.
    const { userData } = this.props;
    const clientID = parseInt(invoice.clientID) - 1;
    const clientName = userData.clients[clientID].name;

    return(
      <tr key={idx} className="invoice-line" onClick={this.saveSelectedInvoice(invoice)}>
        <td> {`INV ${invoice.invoiceID}`} </td>
        <td> {clientName} </td>
        <td> {invoice.date} </td>
        <td className={invoice.balance > 0 ? "green" : ""}> {`$${invoice.balance}`} </td>
      </tr>
    );
  };


  selectInvoiceList = (invoice, idx) => { // selects a list to show based on button pressed.

    if(this.state.activeButton === "allInvoices") {
      return(this.createList(invoice, idx));
    }

    if(this.state.activeButton === "paid" && invoice.balance === 0) {
      return(this.createList(invoice, idx));
    }

    if(this.state.activeButton === "unpaid" && invoice.balance > 0) {
      return(this.createList(invoice, idx));
    }

  };


  render() {
    const { pageData, userData, invoiceMode } = this.props;
    const invoice = this.state;

    if(invoiceMode === "view") { // toggles mode for EDITING the selected invoice vs VIEWING all invoices.
      return (
        <div className="invoices">
          <div className="utility-bar">
            <div
              className={`button invoices${invoice.activeButton === "allInvoices" ? " selected" : ""}`}
              onClick={this.handleActiveBtn("allInvoices")}
            > All Inoivces </div>

            <div
              className={`button paid${invoice.activeButton === "paid" ? " selected" : ""}`}
              onClick={this.handleActiveBtn("paid")}
            > Paid </div>

            <div
              className={`button unpaid${invoice.activeButton === "unpaid" ? " selected" : ""}`}
              onClick={this.handleActiveBtn("unpaid")}
            > UnPaid </div>

            <div className="button new-inv"> New Invoice + </div>
          </div>

          <div className="invoice-list">
            <table>
              <colgroup>
                 <col span="1" style={{width: "15%"}}></col>
                 <col span="1" style={{maxWidth: "45%"}}></col>
                 <col span="1" style={{width: "20%"}}></col>
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
                {userData.invoices !== undefined ? userData.invoices.map(this.selectInvoiceList) : null}
              </tbody>
            </table>
          </div>

          <p> {pageData.info} </p>
        </div>
      );
    }

    if(invoiceMode === "edit") { // for viewing selected invoices (possible added functionality for editing them too).
      return (
        <div className="edit-invoice">
          {this.buildManageableInvoice()}
        </div>
      );
    };

  };
};

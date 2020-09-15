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
          <li> {`Billed for: $${invoice.amountBilled}`} </li>
          <li> {`Balance Due: $${invoice.balanceDue}`} </li>
        </ul>

        <button onClick={this.props.setActiveModeView}> Back </button>
      </div>
    );
  };


  showAmountBilled = (invoice) => { // which amount to show, based on which button is toggled.
    if(this.state.activeButton === "paid") {
      if(invoice.balanceDue === 0) {
        return invoice.amountBilled;
      }else {
        return invoice.amountBilled - invoice.balanceDue;
      }
    }

    return invoice.balanceDue;
  }


  checkBalance = (invoice) => {// check if paid/ owed so the proper colors can be displayed
    if(this.state.activeButton === "paid") {
      return "green";
    }

    if((this.state.activeButton === "allInvoices" || this.state.activeButton === "unpaid") && invoice.balanceDue > 0) {
      return "red";
    }

    return "";
  }


  createList = (invoice, idx) => { // shows a list item.
    const { userData } = this.props;
    const clientID = parseInt(invoice.clientID) - 1;
    const clientName = userData.clients[clientID].name;



    return(
      <tr key={idx} className="invoice-line" onClick={this.saveSelectedInvoice(invoice)}>
        <td> {`INV ${invoice.invoiceID}`} </td>
        <td> {clientName} </td>
        <td> {invoice.date} </td>
        <td className={this.checkBalance(invoice)}>
          {`$${this.showAmountBilled(invoice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
        </td>
      </tr>
    );
  };


  selectInvoiceList = (invoice, idx) => { // selects a list to show based on button pressed.

    if(this.state.activeButton === "allInvoices") {
      return(this.createList(invoice, idx));
    }

    if(this.state.activeButton === "paid" && invoice.balanceDue < invoice.amountBilled) {
      return(this.createList(invoice, idx));
    }

    if(this.state.activeButton === "unpaid" && invoice.balanceDue > 0) {
      return(this.createList(invoice, idx));
    }

  };


  checkBalanceHeading = () => { // output which header should be displayed for the invoices table.
    if(this.state.activeButton === "paid") {
      return "Total";
    };

    return "Balance Due";
  };


  buildTotals = () => { // show balance due or amount paid, based on button selection
    let amountBilled = 0;
    let balanceDue = 0;

    if(this.props.userData.invoices !== undefined) {
      for(var x = 0; x < this.props.userData.invoices.length; x++) {
        amountBilled += this.props.userData.invoices[x].amountBilled;
        balanceDue += this.props.userData.invoices[x].balanceDue;
      };
    }

    return(
      <tr className="totals">
        <td></td>
        <td></td>
        <td style={{float: "right", fontWeight: "bold"}}>
          {this.state.activeButton === "paid" ? "Total:" : "Balance Due:"}
        </td>

        <td className={this.state.activeButton === "paid" ? "green" : "red"}>
          ${this.state.activeButton === "paid" ? (amountBilled - balanceDue).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") :
          balanceDue.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </td>
      </tr>
    );
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
              className={`button unpaid${invoice.activeButton === "unpaid" ? " selected" : ""}`}
              onClick={this.handleActiveBtn("unpaid")}
            > UnPaid </div>

            <div
              className={`button paid${invoice.activeButton === "paid" ? " selected" : ""}`}
              onClick={this.handleActiveBtn("paid")}
            > Paid </div>

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
                <tr className="headers">
                  <th> Invoice # </th>
                  <th> Client </th>
                  <th> Date </th>
                  <th> {this.checkBalanceHeading()} </th>
                </tr>
              </thead>

              <tbody>
                {userData.invoices !== undefined ? userData.invoices.map(this.selectInvoiceList) : null}
                {this.buildTotals()}
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

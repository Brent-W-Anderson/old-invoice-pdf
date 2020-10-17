import React from 'react';
import Moment from 'moment';

import Manageable from './manageable/manageable';
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


  checkBalance = (invoice) => {// check if paid/ owed so the proper colors can be displayed
    if(this.state.activeButton === "paid") {
      return "green";
    }

    if((this.state.activeButton === "allInvoices" || this.state.activeButton === "unpaid") && invoice.balanceDue > 0) {
      return "red";
    }

    return "";
  }


  deleteInvoice = (invoice, idx) => e => {
    e.stopPropagation();

    const confirmed = window.confirm("Are you sure you want to delete invoice " + invoice.invoiceID + "?");
    if(confirmed) {
      this.props.deleteInvoice(invoice, idx)
    }
  }


  showAmountBilled = (invoice, invoiceTotal) => { // which amount to show, based on which button is toggled.
    if(this.state.activeButton === "paid") {
      if(invoice.balanceDue !== 0) {
        return "$" + (invoiceTotal - invoice.balanceDue);
      }

      return "$" + invoiceTotal;
    }

    if(invoice.balanceDue === null || invoice.amountBilled === null) {
      return null;
    }

    return "$" + invoice.balanceDue;
  }


  createList = (invoice, idx) => { // shows a list item.
    function checkForNullBalance(app) {
      if(invoice.balanceDue !== null && invoice.amountBilled !== null) {
        let invoiceTotal = 0;

        for(var x = 0; x < invoice.items.length; x++) {
          invoiceTotal += (invoice.items[x].rate * invoice.items[x].qty);
        }

        return app.showAmountBilled(invoice, invoiceTotal).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }

      return "";
    }

    return(
      <tr key={idx} className="invoice-line" onClick={this.saveSelectedInvoice(invoice)}>
        <td> {`INV ${(new Array(4).join('0') + invoice.invoiceID).slice(-4)}`} </td>
        <td> {invoice.toName} </td>
        <td> {Moment(invoice.date).format('MMM DD, YYYY')} </td>
        <td className={this.checkBalance(invoice)}>
          {checkForNullBalance(this)}
          <div className="delete-container">
            <div onClick={this.deleteInvoice(invoice, idx)} className="delete-btn"> X </div>
          </div>
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

    function checkBtnState(btn) {
      if(btn === "unpaid" || btn ==="allInvoices") { // send the balance due
        return balanceDue.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      };

      // otherwise, send what all was paid so far
      return (amountBilled - balanceDue).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return(
      <tr className="totals">
        <td className="no-border"></td>
        <td></td>
        <td style={{float: "right", fontWeight: "bold"}}>
          {this.state.activeButton === "paid" ? "Total:" : "Balance Due:"}
        </td>

        <td className={`no-border ${this.state.activeButton === "paid" ? "green" : "red"}`}>
          {`$${checkBtnState(this.state.activeButton)}`}
        </td>
      </tr>
    );
  };


  createNewInvoice = idx => () => {
    const { createInvoice, setActiveModeEdit } = this.props;

    createInvoice(idx);

    this.setState({
      selectedInvoiceID: idx
    });

    setActiveModeEdit();
  }


  render() {
    const { pageData, userData, invoiceMode } = this.props;
    const invoice = this.state;

    if(invoiceMode === "view") { // Show all of the invoices
      return (
        <div className="invoices">
          <div className="utility-bar">
            <div
              className={`button invoices${invoice.activeButton === "allInvoices" ? " selected" : ""}`}
              onMouseDown={this.handleActiveBtn("allInvoices")}
            > All Inoivces </div>

            <div
              className={`button unpaid${invoice.activeButton === "unpaid" ? " selected" : ""}`}
              onMouseDown={this.handleActiveBtn("unpaid")}
            > UnPaid </div>

            <div
              className={`button paid${invoice.activeButton === "paid" ? " selected" : ""}`}
              onMouseDown={this.handleActiveBtn("paid")}
            > Paid </div>

            <div className="button new-inv" onClick={this.createNewInvoice(userData.invoices.length)}> New Invoice + </div>
          </div>

          <div className="invoice-list">
            <table>
              <colgroup>
                 <col span="1" style={{width: "15%"}} />
                 <col span="1" style={{maxWidth: "45%"}} />
                 <col span="1" style={{width: "20%"}} />
                 <col span="1" style={{width: "20%"}} />
              </colgroup>

              <thead>
                <tr className="headers">
                  <th> Invoice </th>
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

    if(invoiceMode === "edit") { // If an invoice is selected, switch to a manageable view
      return (
        <div className="edit-invoice">
          {
            <Manageable
              userData = {userData}
              invoiceIdx = {this.state.selectedInvoiceID}
              setActiveModeView = {this.props.setActiveModeView}
              modifyInvoice = {this.props.modifyInvoice}
            />
          }
        </div>
      );
    };

  };
};

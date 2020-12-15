
//NOTES:
  // add an input that allows the user to change how much of the invoice has been paid or not.
  // (this is important for the all Invoices, Unpaid, and paid views)

import React from 'react';

import '../../../../styles/pages/invoices/manageable/manageable.css';
import Preview from '../preview/preview';

export default class Manageable extends React.Component {
  state = {
    selectedBtn: "edit",
    billToEmailWarning: function(app) { // checks to see if warning should be displayed on load
      function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      };

      const email = app.props.userData.invoices[app.props.invoiceIdx].toEmail;
      if(validateEmail(email) || email.length === 0) {
        return ""
      };

      return " show"
    }(this),
    fromEmailWarning: function(app) { // checks to see if warning should be displayed on load
      function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      };

      const email = app.props.userData.invoices[app.props.invoiceIdx].fromEmail;
      if(validateEmail(email) || email.length === 0) {
        return ""
      };

      return " show"
    }(this),
    toEmail: this.props.userData.invoices[this.props.invoiceIdx].toEmail,
    fromEmail: this.props.userData.invoices[this.props.invoiceIdx].fromEmail
  };

  handleSelectedBtn = btnClicked => () => {
    this.setState({
      selectedBtn: btnClicked
    });
  };


  checkValidation = (userData, invoiceIdx, clientIdx, modifyInvoice) => (inputSelected) => { // editing specific invoice data and storing it back in state
    const app = this;
    const targetID = inputSelected.target.id;
    let newVal = inputSelected.target.value;

    function toEmailState(newVal, emailWarning) {
      app.setState({
        toEmail: newVal,
        billToEmailWarning: emailWarning
      });
    }

    function fromEmailState(newVal, emailWarning) {
      app.setState({
        fromEmail: newVal,
        fromEmailWarning: emailWarning
      });
    }

    function validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    };

    switch(targetID) { // which input would you like to modify?
      case "billToEmail":
        if(validateEmail(newVal) || newVal.length === 0) {
          toEmailState(newVal, "");
          modifyInvoice(userData, invoiceIdx, clientIdx, "billToEmail", newVal)();
        }else {
          toEmailState(newVal, " show");
          modifyInvoice(userData, invoiceIdx, clientIdx, "billToEmail", newVal)();
        }
        break;

      case "fromEmail":
        if(validateEmail(newVal) || newVal.length === 0) {
          fromEmailState(newVal, "");
          modifyInvoice(userData, invoiceIdx, clientIdx, "fromEmail", newVal)();
        }else {
          fromEmailState(newVal, " show");
          modifyInvoice(userData, invoiceIdx, clientIdx, "fromEmail", newVal)();
        }
        break;

      default:
        // do nothing for this one
    }
  };


  buildItems = (userData, invoice, invoiceIdx, clientIdx) => (item, idx) => {
    const { modifyInvoice } = this.props;

    function itemTotal() {
      const itemTotal = (item.rate * item.qty).toFixed(2);

      if(itemTotal > 9999999.99) {
        return "too large!";
      }

      return "$" + itemTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return(
      <tbody key={idx}>
        <tr>
          <td/>
          <td className="left">
            <div className="item">
              <input id="description" className="full-width left" value={item.description} type="text" placeholder="Item Description" onChange={modifyInvoice(userData, invoiceIdx, clientIdx, undefined, undefined, idx)} />
            </div>
          </td>
          <td>
            <div className="item">
              <input id="rate" className="full-width" value={item.rate === null ? "" : item.rate} type="number" placeholder="0.00" onChange={modifyInvoice(userData, invoiceIdx, clientIdx, undefined, undefined, idx)} />
            </div>
          </td>
          <td>
            <div className="item">
              <input id="qty" className="full-width" value={item.qty === null ? "" : item.qty} type="number" placeholder="0" onChange={modifyInvoice(userData, invoiceIdx, clientIdx, undefined, undefined, idx)} />
            </div>
          </td>
          <td>
            <p className="amount">{itemTotal()}</p>
          </td>
          <td>  </td>
        </tr>

        <tr>
          <td/>
          <td className="left">
            <textarea id="additionalDetails" value={item.additionalDetails} placeholder="Additional details" onChange={modifyInvoice(userData, invoiceIdx, clientIdx, undefined, undefined, idx)} />
          </td>
        </tr>
      </tbody>
    );
  };


  swapInvoiceID = (invoice, idx) => {
    return(
      <option key={idx}> {invoice.invoiceID} </option>
    );
  };


  render() {
    const { userData, invoiceIdx, setActiveModeView, modifyInvoice } = this.props;

    const invoice = userData.invoices[invoiceIdx];
    const clientIdx = parseInt(invoice.clientID) - 1;

    if(this.state.selectedBtn === "edit") {
      return (
        <div className="manageable">
          <div className="utility-bar">
            <div
            className={`button preview${this.state.selectedBtn === "preview" ? " selected" : ""}`}
            onMouseDown={this.handleSelectedBtn("preview")}>
              Preview
            </div>

            <div
            className={`button edit${this.state.selectedBtn === "edit" ? " selected" : ""}`}
            onMouseDown={this.handleSelectedBtn("edit")}>
              Edit
            </div>
          </div>

          <div className="invoice">
            <form action="#" className="item-list">

              <div className="items">
                <div className="item invoiceName">
                  <input type="text" id="invoiceName" placeholder="Invoice #" value={invoice.invoiceName} onChange={modifyInvoice(userData, invoiceIdx, clientIdx)} />
                  <div className="label">
                    <label htmlFor="invoiceName"/>
                  </div>
                </div>
              </div>



              <div className="items left">
                <div className="item">
                  <div className="label">
                    <label htmlFor="from">
                      <h2> FROM </h2>
                    </label>
                  </div>
                  <input type="text" id="from" style={{opacity: "0", cursor: "default"}}/>
                </div>

                <div className="item text">
                  <div className="label">
                    <label htmlFor="fromName"> Name </label>
                  </div>
                  <input type="text" id="fromName" value={invoice.fromName} onChange={modifyInvoice(userData, invoiceIdx, clientIdx)} />
                </div>

                <div className="item text">
                  <div className="label">
                    <label htmlFor="fromEmail"> Email </label>
                  </div>
                  <input type="email" id="fromEmail" value={invoice.fromEmail} onChange={this.checkValidation(userData, invoiceIdx, clientIdx, modifyInvoice)} />
                  <div className="email-warning">
                    <div className={`warning-icon${this.state.fromEmailWarning}`}> !
                      <div className="note"> <span>Warning!</span> Invalid email address formatting, make sure this is what you intended.
                        <div className="note-accent"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="item text">
                  <div className="label">
                    <label htmlFor="fromStreet"> Address </label>
                  </div>
                  <input type="text" id="fromStreet" placeholder="Street" value={invoice.fromAddress.street} onChange={modifyInvoice(userData, invoiceIdx, clientIdx)} />
                </div>

                <div className="item text">
                  <div className="label">
                    <label htmlFor="fromCityState" />
                  </div>
                  <input type="text" id="fromCityState" placeholder="City, State" value={invoice.fromAddress.cityState} onChange={modifyInvoice(userData, invoiceIdx, clientIdx)} />
                </div>

                <div className="item text">
                  <div className="label">
                    <label htmlFor="fromZip" />
                  </div>
                  <input type="text" id="fromZip" placeholder="Zip" value={invoice.fromAddress.zip} onChange={modifyInvoice(userData, invoiceIdx, clientIdx)} />
                </div>

                <div className="item text">
                  <div className="label">
                    <label htmlFor="fromPhone"> Phone </label>
                  </div>
                  <input type="tel" id="fromPhone" value={invoice.fromPhone} onChange={modifyInvoice(userData, invoiceIdx, clientIdx)} />
                </div>

                <hr className="left" />

                <div className="item text">
                  <div className="label">
                    <label htmlFor="date"> Date </label>
                  </div>
                  <input type="date" id="date" value={invoice.date} onChange={modifyInvoice(userData, invoiceIdx, clientIdx)} />
                </div>
              </div>



              <div className="items right">
                <div className="item">
                  <div className="label">
                    <label htmlFor="from">
                      <h2> BILL TO </h2>
                    </label>
                  </div>
                  <input type="text" id="from" style={{opacity: "0", cursor: "default"}}/>
                </div>

                <div className="item text">
                  <div className="label">
                    <label htmlFor="billToName"> Name </label>
                  </div>
                  <input type="text" id="billToName" value={invoice.toName} onChange={modifyInvoice(userData, invoiceIdx, clientIdx)} />
                </div>

                <div className="item text">
                  <div className="label">
                    <label htmlFor="billToEmail"> Email </label>
                  </div>
                  <input type="email" id="billToEmail" value={this.state.toEmail} onChange={this.checkValidation(userData, invoiceIdx, clientIdx, modifyInvoice)} />
                  <div className="email-warning">
                    <div className={`warning-icon${this.state.billToEmailWarning}`}> !
                      <div className="note"> <span>Warning!</span> Invalid email address formatting, make sure this is what you intended.
                        <div className="note-accent"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="item text">
                  <div className="label">
                    <label htmlFor="billToStreet"> Address </label>
                  </div>
                  <input type="text" id="billToStreet" placeholder="Street" value={invoice.toAddress.street} onChange={modifyInvoice(userData, invoiceIdx, clientIdx)} />
                </div>

                <div className="item text">
                  <div className="label">
                    <label htmlFor="billToCityState" />
                  </div>
                  <input type="text" id="billToCityState" placeholder="City, State" value={invoice.toAddress.cityState} onChange={modifyInvoice(userData, invoiceIdx, clientIdx)} />
                </div>

                <div className="item text">
                  <div className="label">
                    <label htmlFor="billToZip" />
                  </div>
                  <input type="text" id="billToZip" placeholder="Zip" value={invoice.toAddress.zip} onChange={modifyInvoice(userData, invoiceIdx, clientIdx)} />
                </div>

                <div className="item text">
                  <div className="label">
                    <label htmlFor="billToPhone"> Phone </label>
                  </div>
                  <input type="tel" id="billToPhone" value={invoice.toPhone} onChange={modifyInvoice(userData, invoiceIdx, clientIdx)} />
                </div>
              </div>

              <div className="items full-width" style={{marginTop: "20px"}} >
                <hr />
                <table>
                  <colgroup>
                     <col span="1" style={{width: "5%"}} />
                     <col span="1" style={{width: "45%"}} />
                     <col span="1" style={{width: "15%"}} />
                     <col span="1" style={{width: "15%"}} />
                     <col span="1" style={{width: "15%"}} />
                     <col span="1" style={{width: "5%"}} />
                  </colgroup>

                  <thead>
                    <tr>
                      <th></th>
                      <th className="left"> DESCRIPTION </th>
                      <th> RATE </th>
                      <th> QTY </th>
                      <th> AMOUNT </th>
                      <th> TAX </th>
                    </tr>
                  </thead>
                </table>
                <hr />
              </div>

              <div className="items full-width">
                <table>
                  <colgroup>
                    <col span="1" style={{width: "5%"}} />
                    <col span="1" style={{width: "45%"}} />
                    <col span="1" style={{width: "15%"}} />
                    <col span="1" style={{width: "15%"}} />
                    <col span="1" style={{width: "15%"}} />
                    <col span="1" style={{width: "5%"}} />
                  </colgroup>

                  {invoice.items.map(this.buildItems(userData, invoice, invoiceIdx, clientIdx))}
                </table>
              </div>
            </form>
          </div>

          <div className="utility-bar">
            <div className="button black" onClick={setActiveModeView}> Back </div>
          </div>
        </div>
      );
    }

    if(this.state.selectedBtn === "preview") {
      return (
        <div className="manageable preview">
          <div className="utility-bar">
            <div
            className={`button preview${this.state.selectedBtn === "preview" ? " selected" : ""}`}
            onMouseDown={this.handleSelectedBtn("preview")}>
              Preview
            </div>

            <div
            className={`button edit${this.state.selectedBtn === "edit" ? " selected" : ""}`}
            onMouseDown={this.handleSelectedBtn("edit")}>
              Edit
            </div>
          </div>

          <Preview invoice={invoice} setActiveModeView={setActiveModeView} />
        </div>
      );
    }
  };
};

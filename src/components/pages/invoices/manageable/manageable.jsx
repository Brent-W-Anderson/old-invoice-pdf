import React from 'react';

import '../../../../styles/pages/invoices/manageable/manageable.css';

export default class Manageable extends React.Component {
  state = {
    selectedBtn: "edit",
    emailWarning: function(app) {
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
    toEmail: this.props.userData.invoices[this.props.invoiceIdx].toEmail
  };

  handleSelectedBtn = btnClicked => () => {
    this.setState({
      selectedBtn: btnClicked
    });
  };


  modifyInvoice = (userData, invoiceIdx, clientIdx, modifyInvoice) => (inputSelected) => { // editing specific invoice data and storing it back in state
    const app = this;
    const targetID = inputSelected.target.id;
    let newVal = inputSelected.target.value;

    function overwriteState(newVal, emailWarning) {
      app.setState({
        toEmail: newVal,
        emailWarning: emailWarning
      });
    }

    switch(targetID) { // which input would you like to modify?
      case "billToEmail":
        function validateEmail(email) {
          const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(String(email).toLowerCase());
        };

        if(validateEmail(newVal) || newVal.length === 0) {
          overwriteState(newVal, "");
          modifyInvoice(userData, invoiceIdx, clientIdx, "billToEmail", newVal)();
        }else {
          overwriteState(newVal, " show");
          modifyInvoice(userData, invoiceIdx, clientIdx, "billToEmail", newVal)();
        }
        break;

      default:
        // do nothing for this one
    }
  };


  render() {
    const { userData, invoiceIdx, setActiveModeView, modifyInvoice } = this.props;

    const invoice = userData.invoices[invoiceIdx];
    const clientIdx = parseInt(invoice.clientID) - 1;

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
                <input type="text" id="fromEmail" value={invoice.fromEmail} onChange={modifyInvoice(userData, invoiceIdx, clientIdx)} />
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

              <hr style={{width: "200%"}} />

              <div className="item text">
                <div className="label">
                  <label htmlFor="date"> Date </label>
                </div>
                <input type="date" id="date" value={invoice.date} onChange={modifyInvoice(userData, invoiceIdx, clientIdx)} />
              </div>

              <div className="item text">
                <div className="label">
                  <label htmlFor="amountBilled"> Amount Billed </label>
                </div>
                <input type="number" id="amountBilled" value={invoice.amountBilled} onChange={modifyInvoice(userData, invoiceIdx, clientIdx)} />
              </div>

              <div className="item text">
                <div className="label">
                  <label htmlFor="balanceDue"> Balance Due </label>
                </div>
                <input type="number" id="balanceDue" value={invoice.balanceDue} onChange={modifyInvoice(userData, invoiceIdx, clientIdx)} />
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
                <input type="email" id="billToEmail" value={this.state.toEmail} onChange={this.modifyInvoice(userData, invoiceIdx, clientIdx, modifyInvoice)} />
                <div className="email-warning">
                  <div className={`warning-icon${this.state.emailWarning}`}> !
                    <div className="note"> <span>Warning:</span> Invalid email address formatting, make sure this is what you intended.
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
          </form>
        </div>



        <div className="utility-bar">
          <div className="button back" onClick={setActiveModeView}> Back </div>
        </div>
      </div>
    );
  };
};

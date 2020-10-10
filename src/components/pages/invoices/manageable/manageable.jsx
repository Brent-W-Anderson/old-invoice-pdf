import React from 'react';

import '../../../../styles/pages/invoices/manageable/manageable.css';

export default class Manageable extends React.Component {
  state = {
    selectedBtn: "edit"
  };

  handleSelectedBtn = btnClicked => () => {
    this.setState({
      selectedBtn: btnClicked
    });
  };

  render() {
    const { userData, invoiceIdx, setActiveModeView, modifyInvoice } = this.props;

    const invoice = userData.invoices[invoiceIdx];
    const clientIdx = parseInt(invoice.clientID) - 1;
    const client = userData.clients[clientIdx];

    return (

      <div className="manageable">
        <div className="utility-bar">
          <div
          className={`button preview${this.state.selectedBtn === "preview" ? " selected" : ""}`}
          onClick={this.handleSelectedBtn("preview")}>
            Preview
          </div>

          <div
          className={`button edit${this.state.selectedBtn === "edit" ? " selected" : ""}`}
          onClick={this.handleSelectedBtn("edit")}>
            Edit
          </div>
        </div>

        <div className="invoice">
          <div className="topper"></div>

          <form action="#" className="item-list">
            <div className="items left">
              <h2> From </h2>

              <div className="item text">
                <div className="label">
                  <label htmlFor="fromName"> Name: </label>
                </div>
                <input type="text" id="fromName" value={userData.personalInfo.name} onChange={modifyInvoice(userData, invoiceIdx, clientIdx)} />
              </div>

              <div className="item text">
                <div className="label">
                  <label htmlFor="invoiceNum"> Invoice #: </label>
                </div>
                <input type="text" id="invoiceNum" value={invoice.invoiceNum} onChange={modifyInvoice(userData, invoiceIdx, clientIdx)} />
              </div>

              <div className="item">
                <div className="label">
                  <label htmlFor="date"> Date: </label>
                </div>
                <input type="date" id="date" value={invoice.date} onChange={modifyInvoice(userData, invoiceIdx, clientIdx)} />
              </div>

              <div className="item">
                <div className="label">
                  <label htmlFor="amountBilled"> Amount Billed: </label>
                </div>
                <input type="number" id="amountBilled" value={invoice.amountBilled} onChange={modifyInvoice(userData, invoiceIdx, clientIdx)} />
              </div>

              <div className="item">
                <div className="label">
                  <label htmlFor="balanceDue"> Balance Due: </label>
                </div>
                <input type="number" id="balanceDue" value={invoice.balanceDue} onChange={modifyInvoice(userData, invoiceIdx, clientIdx)} />
              </div>
            </div>

            <div className="items right">
              <h2> Bill To </h2>

              <div className="item text">
                <div className="label">
                  <label htmlFor="billToName"> Name: </label>
                </div>
                <input type="text" id="billToName" value={client.name} onChange={modifyInvoice(userData, invoiceIdx, clientIdx)} />
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

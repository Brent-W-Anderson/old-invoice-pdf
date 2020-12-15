import React from 'react';

import '../../../../styles/pages/invoices/preview/preview.css';
import GetApp from '@material-ui/icons/GetApp';
// import Pdfcrowd from 'pdfcrowd';

export default class preview extends React.Component {
  downloadPDF = () => {
    console.log("download pdf version of it here.");
  };

  render() {
    const { invoice, setActiveModeView } = this.props;

    return(
      <div>
        <div id="preview" className="invoice">
          <p> {invoice.invoiceName} </p>
        </div>

        <div className="utility-bar preview">
          <div className="button black" onClick={setActiveModeView}> Back </div>
          <div id="createPDF" className="button blue" onClick={this.downloadPDF}>
            <p> PDF <GetApp className="downloadIcon"/></p>
          </div>
        </div>
      </div>
    );
  };
};

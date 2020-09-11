import React from 'react';

import '../../styles/pages/pages.css';

export default class Pages extends React.Component {
  render() {
    const { activePage } = this.props;

    return (
      <div className="pages">
        <div className={`page invoices ${activePage === "invoices" ? "selected" : ""}`}>
          <div className="container">
            <p> invoices </p>
          </div>
        </div>

        <div className={`page clients ${activePage === "clients" ? "selected" : ""}`}>
          <div className="container">
            <p> clients </p>
          </div>
        </div>

        <div className={`page settings ${activePage === "settings" ? "selected" : ""}`}>
          <div className="container">
            <p> settings </p>
          </div>
        </div>
      </div>
    );
  }
}

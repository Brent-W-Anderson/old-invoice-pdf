import React from 'react';

import '../../styles/pages/pages.css';

export default class Pages extends React.Component {
  render() {
    const { activePage } = this.props;

    return (
      <div className="pages">
        <div className={`page invoices ${activePage === "invoices" ? "selected" : ""}`}>
          <p> invoices </p>
        </div>

        <div className={`page clients ${activePage === "clients" ? "selected" : ""}`}>
          <p> clients </p>
        </div>

        <div className={`page settings ${activePage === "settings" ? "selected" : ""}`}>
          <p> settings </p>
        </div>
      </div>
    );
  }
}

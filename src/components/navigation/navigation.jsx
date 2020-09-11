import React from 'react';

export default class Navigation extends React.Component {
  render() {
    return(
      <div className="nav">
        <div className="logo"/>
        <ul className="tabs">
          <li> Invoices </li>
          <li> Clients </li>
          <li> Settings </li>
        </ul>
        <div className="user"></div>
        <button className="logout"/>
      </div>
    );
  };
};

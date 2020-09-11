import React from 'react';

import '../../styles/navigation/navigation.css';

export default class Navigation extends React.Component {
  state = {
    animation: "fadeInDown"
  }

  render() {
    const { activeUser } = this.props;

    return(
      <div className={`nav ${this.state.animation}`}>
        <div className="page">
          <div className="container">
            <div className="logo"/>
            <ul className="tabs">
              <li> Invoices </li>
              <li> Clients </li>
              <li> Settings </li>
              <li className="logout"> Logout </li>
            </ul>
            <div className="user">
              <div className="container">
                <p className="line">|</p>
                <p className="username"> {activeUser} </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

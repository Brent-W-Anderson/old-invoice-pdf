import React from 'react';

import '../../styles/navigation/navigation.css';

export default class Navigation extends React.Component {
  state = {
    animation: "pageFadeInDown"
  };

  buildTabs = (tab, idx) => {
    const { setActivePage, activePage } = this.props;
    let name = tab.name.substring(0, 12);

    if (tab.name.length > 12) {
      name += "...";
    };

    return(
      <li key={idx} onClick={setActivePage} className={activePage === tab.name.toLowerCase() ? "selected" : ""}> {name} </li>
    );
  };

  logout = () => {
    const { logout } = this.props;
    let answer = window.confirm("Do you really want to logout?");

    if(answer) {
      this.setState({
        animation: "pageFadeOutUp"
      });

      logout();
    };
  }

  render() {
    const { activeUser, appData } = this.props;

    return(
      <div className={`nav ${this.state.animation}`}>
          <div className="container">

            <ul className="tabs">
              {appData.map(this.buildTabs)}
              <li className="logout" onClick={this.logout}> Logout </li>
            </ul>

            <div className="user">
              <div className="container">
                <p className="line">|</p>
                <p className="username"> {activeUser} </p>
                <div className="userIcon">
                  <div className="helper" />
                  <img alt="user icon" src="./images/userIcon.png"/>
                </div>
              </div>
            </div>

        </div>
      </div>
    );
  };
};

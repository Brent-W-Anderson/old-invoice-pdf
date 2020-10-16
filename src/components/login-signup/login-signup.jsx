import React from 'react';

import '../../styles/login-signup/login-signup.css';

export default class LoginSignUp extends React.Component {
  state = {
    animation: "fadeInDown",
    user: "",
    pass: ""
  }

  animateOut = () => {
    this.setState({
      animation: "fadeOutUp"
    });
  }

  checkLogin = (event) => {
    const { login, users } = this.props;

    for(let x = 0; x < users.length; x++) {
      if (users[x].user.toLowerCase() === this.state.user.toLowerCase() && users[x].pass === this.state.pass) {
        event.preventDefault();

        if(users[x].user === "template") { // just a template, not an actual user.
          return;
        }

        login(users[x]);
        this.animateOut();
        return;
      }
    };

    console.log("user: " + this.state.user + "\r\npassword: " + this.state.pass + "\r\n\r\nlogin credentials don't match, try again..");

    this.setState({
      user: "",
      pass: ""
    });
  };

  setUser = (evnt) => {
    this.setState({
      user: evnt.target.value
    });
  };

  setPass = (evnt) => {
    this.setState({
      pass: evnt.target.value
    });
  };

  render() {
    return(
      <div className={`wrapper ${this.state.animation}`}>
        <div id="formContent">
          <form action="#">
            <input type="text" className="fadeIn second" name="user" placeholder="Username" value={this.state.user} onChange={this.setUser} />
            <input type="text" className="fadeIn third" name="password" placeholder="Password" value={this.state.pass} onChange={this.setPass} />
            <input type="submit" className="fadeIn fourth" value="Log In" onClick={this.checkLogin} />
          </form>

          <div id="formFooter">
            <p className="underlineHover">Create new account?</p>
          </div>
        </div>
      </div>
    );
  };
};

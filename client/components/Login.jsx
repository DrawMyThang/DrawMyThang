import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props)
    this.authWithGithub = this.authWithGithub.bind(this);
    this.authWithEmailPassword = this.authWithEmailPassword.bind(this);
  }

  authWithGithub() {
    console.log("Authed with Github");
  }

  authWithEmailPassword(event) {
    event.preventDefault();
    console.log("Authed with email");
    console.table([{
      email: this.emailInput.value,
      password: this.passwordInput.value,
    }]);
  }

  render() {
    return (
      <div>
        <button style={{width: "100%"}} className="pt-button pt-intent-primary" onClick={() => { this.authWithGithub() }}>Login with Github</button>
        <hr style={{marginTop: "1rem", marginBottom: "1rem"}}/>
        <form onSubmit={(event) => { this.authWithEmailPassword(event) }} ref={(form) => { this.loginForm = form}}>
          <div style={{marginBottom: "1rem"}} className="pt-callout pt-icon-info-sign">
            
            <h5>Note</h5>
            If you don't have an account already, this form will create your account
          
          </div>

          <label className="pt-label">
            Email
            <input style={{width: "100%"}} className="pt-input" name="email" type="email" ref={(input) => { this.emailInput = input }} placeholder="Email"></input>  
          </label>
          <label className="pt-label">
            Password
            <input style={{width: "100%"}} className="pt-input" name="password" type="password" ref={(input) => { this.passwordInput = input }} placeholder="Password"></input>
          </label>
          
          <input style={{width: "100%"}} type="submit" className="pt-button pt-intent-primary" value="Login"></input>
        </form>
      </div>
    );
  };
}

export default Login;


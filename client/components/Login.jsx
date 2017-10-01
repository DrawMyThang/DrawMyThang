import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Toaster, Intent } from '@blueprintjs/core';

import { app, githubProvider } from '../../env/base.jsx';

const loginStyles = {
  width: "90%",
  maxWidth: "24rem",
  margin: "1rem auto",
  border: "0.1rem solid #ddd",
  borderRadius: "0.3rem",
  padding: "0.3rem"
}

class Login extends Component {
  constructor(props) {
    super(props)
    this.authWithGithub = this.authWithGithub.bind(this);
    this.authWithEmailPassword = this.authWithEmailPassword.bind(this);

    this.state = {
      redirect: false
    }
  }

  authWithGithub() {
    app.auth().signInWithPopup(githubProvider)
      .then((result, error) => {
        // console.log('github stuff ', result);
        if (error) {
          this.toaster.show({ 
            intent: Intent.DANGER, message: "Unable to login with Github" 
          });
        } else {
          console.log(result, 'authWithGithub')
          const user_id = { 
            displayName: result.user.displayName,
            photourl: result.user.photoURL,
            uid: result.user.uid,
          }
          if (!result.user.displayName) {
            user_id.displayName = result.user.uid;
          }
          console.log('what is props ', this.state);
          this.setState({
            user: user_id,
          });
          this.props.log(true);
          this.props.state.socket.emit('connect user', user_id);
          this.setState({ redirect: true });
        }
      });
  }

  authWithEmailPassword(event) {
    event.preventDefault();

    const email = this.emailInput.value;
    const password = this.passwordInput.value;

    app.auth().fetchProvidersForEmail(email)
      .then((providers) => {
        console.log('providers', this.state);
        if (providers.length === 0) {
          // create user
          return app.auth().createUserWithEmailAndPassword(email, password);
        } else if (providers.indexOf('password') === -1) {
          // they used github
          this.loginForm.reset();
          this.toaster.show({ intent: Intent.WARNING, message: 'You have already created an account.'});
        } else {
          // sign user in
          return app.auth().signInWithEmailAndPassword(email, password); 
        }
      })
      .then((user) => {
        if (user && user.email) {
          
          const user_id = { 
            displayName: user.uid,
            photoURL: user.photoURL,
            uid: user.uid,
          }
          this.setState({
            user: user_id,
          });
          this.props.log(true);
          this.props.state.socket.emit('connect user', user_id);
          this.loginForm.reset();
          this.setState({redirect: true});
        }
      })
      .catch((error) => {
        this.toaster.show({ intent: Intent.DANGER, message: error.message});
      });

  }

  render() {
    if (this.state.redirect === true) {
      return <Redirect to='/' />
    }

    return (
      <div style={loginStyles}>
        <Toaster ref={(element) => { this.toaster = element }} />
        <button style={{width: "100%"}} className="pt-button pt-intent-primary" onClick={() => { this.authWithGithub() }}>Login with Github</button>
        <hr style={{marginTop: "1rem", marginBottom: "1rem"}}/>
        <form onSubmit={(event) => { this.authWithEmailPassword(event) }} ref={(form) => { this.loginForm = form}}>
          <div style={{marginBottom: "1rem"}} className="pt-callout pt-icon-info-sign">
            
            <h5>Note</h5>
            If you don't have an account already, this form will create your account
          
          </div>

          <label className="pt-label">
            Email
            <input style={{width: "100%"}} className="pt-input" name="email" type="email"
             ref={(input) => { this.emailInput = input }} placeholder="Email"></input>  
          </label>
          <label className="pt-label">
            Password
            <input style={{width: "100%"}} className="pt-input" name="password" 
            type="password" ref={(input) => { this.passwordInput = input }} placeholder="Password"></input>
          </label>
          
          <input style={{width: "100%"}} type="submit" className="pt-button pt-intent-primary" value="Login"></input>
        </form>
      </div>
    );
  }
}

export default Login;


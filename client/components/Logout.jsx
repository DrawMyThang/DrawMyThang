import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Spinner } from '@blueprintjs/core';
import socket from 'socket.io-client';
import { app } from '../../env/base.jsx';

class Logout extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
    };
  }

  componentWillMount() {
    app.auth().signOut().then((user) => {
      // console.log('disconnect ', user);
      console.log('disconnect ', this.props.state.user);
      this.props.state.socket.emit('disconnect user', this.props.state.user);
      this.setState({ redirect: true });
    });
  }

  render() {
    if (this.state.redirect === true) {
      return <Redirect to='/' />
    }
    return (
      <div style={{ textAlign: 'center', position: 'absolute', top: '25%', left: '50%' }}>
        <h3>Logging Out</h3>
        <Spinner /> 
      </div>
    );
  }
}

export default Logout;
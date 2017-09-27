import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Spinner } from '@blueprintjs/core';
import Header from './Header.jsx';
import Login from './Login.jsx';
import Logout from './Logout.jsx';
import ChatBox from './chatBox.jsx';
import Canvas from './canvas.jsx';
import UserBox from './userBox.jsx';
import socket from 'socket.io-client';
import GamePlayTimer from './gamePlayTimer.jsx'
import { app, base } from '../../env/base.jsx';

//import openSocket from 'socket.io-client';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      authenticated: false,
      loading: true,
      socket: socket('http://localhost:8080'),
    };
  }

  componentWillMount() {
    this.removeAuthListener = app.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authenticated: true,
          loading: false,
        });
      } else {
        this.setState({
          authenticated: false,
          loading: false,
        });
      }
    });
  }

  componentWillUnmount() {
    this.removeAuthListener();
  }

  render() {
    if (this.state.loading === true) {
      return (
        <div style={{ textAlign: 'center', position: 'absolute', top: '25%', left: '50%' }}>
          <h3>Loading</h3>
          <Spinner /> 
        </div>
      );
    }

    return (
      <div>
        <BrowserRouter>
          <div>
            <Header authenticated={this.state.authenticated} />
            <div className="main-content" style={{padding: "1rem"}} >
              <div className="workspace" >
                <Route exact path="/login" component={Login} />
                <Route exact path="/logout" component={Logout} />
              </div>
            </div>
          </div>
        </BrowserRouter>
        <GamePlayTimer socket={this.state.socket}/>
      <div id="whole">
        <section className="sidebar">
          <UserBox socket={this.state.socket} />
          <ChatBox socket={this.state.socket} />
        </section>
        <Canvas />
      </div>
      </div>
    );
  }
}

export default App;
import { Spinner } from '@blueprintjs/core';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import socket from 'socket.io-client';
import Header from './Header.jsx';
import Login from './Login.jsx';
import Logout from './Logout.jsx';
import ChatBox from './chatBox.jsx';
import Canvas from './canvas.jsx';
import UserBox from './userBox.jsx';
import GamePlayTimer from './gamePlayTimer.jsx';
import Worddisplay from './Worddisplay.jsx';
import { app, base, githubProvider } from '../../env/base.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {
        displayName: '',
        photoURL: null,
        uid: '',
      },

      authenticated: false,
      loading: true,
      socket: socket('http://localhost:8080'),
    };
  }

  componentDidMount() {
    this.removeAuthListener = app.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user);

        const user_id = {
          displayName: user.displayName,
          photourl: user.photoURL,
          uid: user.uid,
        }
        if (!user.displayName) {
          user_id.displayName = user.uid;
        }
        console.log('user id ', user_id);
        this.setState({
          user: user_id,
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
      <div id='firstDiv'>
        <BrowserRouter>
          <div>
            <Header authenticated={this.state.authenticated} />
            <div className="main-content"  >
              <div className="workspace" >
                <Route path="/login" render={() => <Login state={this.state} />} />
                <Route path="/logout" render={() => <Logout state={this.state} />} />
              </div>
            </div>
          </div>
        </BrowserRouter>
        <div id="whole">
          <section className="sidebar">
            <UserBox socket={this.state.socket} />
            <ChatBox socket={this.state.socket} auth_user={this.state.user} />
          </section>
        <div id="wordCanvasDisplay">
          <div id="timerWordDisplay">
            <GamePlayTimer socket={this.state.socket}/>
            <Worddisplay socket={this.state.socket} uid={this.state.user.uid} />
          </div>
            <Canvas socket={this.state.socket} uid={this.state.user.uid}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
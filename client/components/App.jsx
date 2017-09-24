import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header.jsx';
import Login from './Login.jsx';
import ChatBox from './chatBox.jsx';
import Canvas from './canvas.jsx';
import Base from '../base.jsx';

//import openSocket from 'socket.io-client';



class App extends React.Component {
  constructor() {
    super();
    this.state = {
      authenticated: false,
    };
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header authenticated={this.state.authenticated} />
            <div className="main-content" style={{padding: "0.5rem"}}>
              <div className="workspace">
                <Route exact path="/login" component={Login} />
              </div>
            </div>
          </div>
        </BrowserRouter>
        <Canvas />
        <ChatBox />
      </div>
    );
  }
}

export default App;

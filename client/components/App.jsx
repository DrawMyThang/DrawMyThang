import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header.jsx';
import Login from './Login.jsx';
import ChatBox from './chatBox.jsx';
import Canvas from './canvas.jsx';
import UserBox from './userBox.jsx';

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
      <div id="whole">
        <section className="sidebar">
          <UserBox />
          <ChatBox />
        </section>
        <Canvas />
      </div>
      </div>
    );
  }
}

export default App;

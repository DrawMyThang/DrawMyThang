import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header.jsx';
import ChatBox from './chatBox.jsx';
import Canvas from './canvas.jsx';
//import openSocket from 'socket.io-client';

class App extends React.Component {
  // constructor() {
  //   super();
  // }
  render() {
    return (
      <div>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      <div id ="whole">
        <section className="sidebar">
          <div className = "users"> this will eventually be users box</div>
          <ChatBox />
        </section>
        <Canvas />
      </div>
      </div>
    );
  }
}

export default App;

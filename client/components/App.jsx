import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header.jsx';
import ChatBox from './chatBox.jsx';
import Canvas from './canvas.jsx';
import UserBox from './userBox.jsx';

class App extends React.Component {
 
  render() {
    return (
      <div>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      <div id ="whole">
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

import React from 'react';
import socket from 'socket.io-client';

class ChatBox extends React.Component {
  constructor(props) {
    super(props);
    console.log(props, 'chat box props');
    this.state = {
      text: [],
    };

    this.message = '';
    this.handleText = this.handleText.bind(this);
    this.chatMessage = this.chatMessage.bind(this);
    this.handleChat = this.handleChat.bind(this);
  }

  componentDidMount() {
    this.socket = socket('http://localhost:8080');
    this.socket.on('chat message', this.chatMessage);
  }

  chatMessage(text) {
    this.setState({
      text: [...this.state.text, text],
    });
  }

  handleChat() {
    this.socket.emit('chat message', this.message);
    document.getElementById('m').value = null;
  }

  handleText(e) {
    this.message = e.target.value;
  }


  render(){
    return(
      <div className="chatWrapper">
          <div id="chatBoxTitle">Chats:</div>
        {this.state.text.map((msg,i) =>  <div className = "userChatLog"> <div className="userPhoto"></div> <p key={i} className="chatMessage" >{msg}</p> </div>)}
            <div id="form">
              <input id="m" onChange={this.handleText} />
              <button onClick={()=>{
                this.handleChat();
                }
              }> Send</button>
            </div>
      </div>

    )
  }

}

export default ChatBox;

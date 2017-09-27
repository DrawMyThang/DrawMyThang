import React from 'react';

export default class ChatBox extends React.Component {
  constructor(props) {
    super(props);
    console.log(props, 'chat box props');
    this.state = {
      text: [],
    };
    this.userPic = "http://www.iconsdb.com/icons/preview/guacamole-green/guest-xxl.png"
    this.message = '';
    this.handleText = this.handleText.bind(this);
    this.chatMessage = this.chatMessage.bind(this);
    this.handleChat = this.handleChat.bind(this);
    this.handleEnterKey = this.handleEnterKey.bind(this);
  }

  componentDidMount() {
    this.props.socket.on('chat message', this.chatMessage);
  }

  chatMessage(text) {
    this.setState({
      text: [...this.state.text, text],
    });
  }

  handleChat() {
    this.props.socket.emit('chat message', this.message);
    document.getElementById('m').value = null;
  }

  handleText(e) {
    this.message = e.target.value;
  }

  handleEnterKey(event){
    if (event.keyCode === 13){
    console.log('clicked send')
      document.getElementById('chatButton').click();
    }
  }


  render(){
    return(
      <div className="chatWrapper">
          <div id="chatBoxTitle">Chats</div>
        {this.state.text.map((msg,i) =>  <div className = "userChatLog"> <div ><img className="userPhoto" src={this.userPic}/></div> <p key={i} className="chatMessage" >{msg}</p> </div>)}
            <div id="form">
              <input id="m" onChange={this.handleText} onKeyDown={this.handleEnterKey} />
                
              <button id ="chatButton"onClick={()=>{
                this.handleChat();
                }
              }> Send</button>
            </div>
      </div>

    )
  }

}



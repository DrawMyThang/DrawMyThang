import React from 'react';
import ChatBox from './chatBox.jsx'
import socket from 'socket.io-client';

export default class UserBox extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
  		users: []
  	}
  	this.getUserId = this.getUserId.bind(this)
  }


  componentWillMount() {
    this.socket = socket('http://localhost:8080');
    this.socket.on('user id', this.getUserId);
    this.socket.emit('user id', this.state.users);
  }



  getUserId(users) {
  	console.log(users, "users from get USERid ")
    console.log(this.state.users, "this.state.users")
    this.setState({
      users: [...users],
    });
        console.log(this.state.users, "this.state.users after set state")

  }

  render(){
  	return(
  			<div className="userBox">
  					{this.state.users.map((user,i) => <p key={i}> User {i+1}: {user}</p>)}
  					
  			</div>
  		)
  }

}
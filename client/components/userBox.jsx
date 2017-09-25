import React from 'react';
import socket from 'socket.io-client';

export default class UserBox extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
  		users: []
  	}
  	this.getUserId = this.getUserId.bind(this)
  }


  componentDidMount() {
    this.socket = socket('http://localhost:8080');
    this.socket.on('user id', this.getUserId);
    this.socket.emit('user id', this.state.users);
    console.log("componentDidMount")
  }


  getUserId(users) {
  	console.log(users, "userBox")
    this.setState({
      users: [...this.state.users, users],
    });
  }

  render(){
  	return(
  			<div className="userBox">
  					{this.state.users}
  			</div>
  		)
  }

}
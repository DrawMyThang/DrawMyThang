import React from 'react';
import ChatBox from './chatBox.jsx'
import socket from 'socket.io-client';

export default class UserBox extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
  		users: [],
  	}
    this.getUserId = this.getUserId.bind(this);
    this.updateDisplayUsers = this.updateDisplayUsers.bind(this);
    this.getUsers = this.getUsers.bind(this);
  }

  componentDidMount() {
    this.props.socket.on('get users', this.getUsers);
    this.props.socket.emit('get users');
    this.props.socket.on('display users', this.getUserId);
    this.props.socket.on('update display users', this.updateDisplayUsers);
  }

  getUsers(result) {
    const usersArr = [];
    for (let key in result) {
      // console.log('result at key ', result[key])
        usersArr.push(result[key]);
    }
    this.setState({
      users: [...usersArr],
    });
  }

  updateDisplayUsers(users) {
    console.log(users);
  }

  getUserId(user) {
    this.setState({
      users: [...this.state.users, user],
    });
  }

  render(){
  	return(
  			<div className="userBox">
  					{this.state.users.map((user,i) => <p key={i}> User {i+1}: {user.displayName} points: {user.points} </p>)}
  			</div>
  		)
  }

}
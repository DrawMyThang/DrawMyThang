import React from 'react';
import ChatBox from './chatBox.jsx'
import socket from 'socket.io-client';

export default class UserBox extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
  		users: [],
  	}
  	this.getUserId = this.getUserId.bind(this)
  }


  componentWillMount() {
    this.props.socket.on('user id', this.getUserId);
    this.props.socket.on('disconnect', this.getUserId);
    this.props.socket.emit('user id', this.state.users);
  }

  // componentDidMount() {
  //   fetch('/users', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     credentials: 'same-origin'
  //   }).then(response => {
  //     return response.json();
  //   }).then(result => {
  //     const usersArr = [];
  //     for (let key in result) {
  //       console.log('result at key ', result[key]);
  //       if (result[key].displayName) {
  //         usersArr.push(result[key].displayName);
  //       } else {
  //         usersArr.push(result[key].uid);
  //       }
  //     }
  //     this.setState({
  //       users: [...usersArr],
  //     });
  //   });
  //   this.props.socket.on('display users', this.getUserId);
  // }



  getUserId(user) {
    console.log('did this thing happen', user);
    this.setState({
      users: [...this.state.users, user],
    });

  }

  render(){
  	return(
  			<div className="userBox">
  					{this.state.users.map((user,i) => <p key={i}> User {i+1}: {user}</p>)}
  					
  			</div>
  		)
  }

}
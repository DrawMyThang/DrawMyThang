import App from './App.jsx'
import React from 'react'
import socket from 'socket.io-client';

export default class GamePlayTimer extends React.Component{
	constructor(){
		super()
		this.state = {
			time: "not started",
		}
		this.handleTimer = this.handleTimer.bind(this);
		this.connectSocket = this.connectSocket.bind(this);
	}

	connectSocket(){
		this.socket = socket('http://localhost:8080');
		this.socket.emit('timer');
    this.socket.on('timer', this.handleTimer);
	}

	handleTimer(time){
		this.setState({
			time: time
		})
	}

	render(){
		return(

			<div>
				<div id="gamePlayTimer">Game Play Timer: {this.state.time} </div>
				<button id="gamePlayTimerButton" onClick={this.connectSocket}> Click to Start Timer </button>
			</div>

			)
	}

}
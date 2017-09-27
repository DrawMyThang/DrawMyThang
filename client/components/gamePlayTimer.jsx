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

	componentDidMount(){
		this.props.socket.on('timer', this.handleTimer);
	}

	connectSocket(){
		this.socket.emit('timer');
	}

	handleTimer(time){
		this.setState({
			time: time
		})
	}

	render(){
		return(

			<div>
				<h3 id="gamePlayTimer">Game Play Timer: {this.state.time} </h3>
				<button id="gamePlayTimerButton" onClick={this.connectSocket}> Click to Start Timer </button>
			</div>

			)
	}

}
import App from './App.jsx'
import React from 'react'

export default class GamePlayTimer extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			time: "",
			users: 0,
			players: "players",
			declaration: ""
		}
		this.handleTimer = this.handleTimer.bind(this);
		this.handleUserNumber = this.handleUserNumber.bind(this)
		this.handlePlayers = this.handlePlayers.bind(this)
	}

	componentDidMount(){

		this.props.socket.on('timer', this.handleTimer);
	}

	connectSocket(){
		this.props.socket.emit('timer');
	}
		//this.props.socket.on('user id', this.handleUserNumber);


	handleTimer(time){
		this.setState({
			time: time
		})
	}

	handleUserNumber(user){
		this.setState({
			users: user.length
		})
		this.handlePlayers();
		console.log(user, "users in gamePlayTimer")
	}

	handlePlayers(){
		if (this.state.users < 2){
			this.setState({
				players: "players",
				declaration: `GamePlayTimer: ${this.state.time} Need ${3- this.state.users} more ${this.state.players}`
			})
		} else if (this.state.users === 2){
			this.setState({
				declaration: `GamePlayTimer: ${this.state.time} Need ${3- this.state.users} more player`
			})
		} else {
			this.setState({
				declaration: "GamePlayTimer: "
			})
		}
	}



	render(){
		return(

			<div>
				<div id="gamePlayTimer">{this.state.declaration} {this.state.time}</div>
			</div>

			)
	}

}
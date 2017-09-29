import App from './App.jsx'
import React from 'react'

export default class GamePlayTimer extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			time: "",
			users: 0,
			players: "players",
			declaration: "",
			count: 0
		}
		this.handleTimer = this.handleTimer.bind(this);
		this.handleUserNumber = this.handleUserNumber.bind(this)
		this.handlePlayers = this.handlePlayers.bind(this)
	}

	componentDidMount(){
		this.props.socket.on('timer', this.handleTimer);
		this.props.socket.on('numOfUsers', this.handleUserNumber);
		this.props.socket.emit('numOfUsers');
	}

	connectSocket(){
		this.props.socket.emit('timer');
	}

	handleTimer(time){
		console.log(this.state.count, 'count')
		if (this.state.count < 5){
			this.setState({
				time: time,
				declaration: "Get Ready In: ",
				count: this.state.count+=1
			})
		} else if (this.state.count >= 5){
			this.setState({
				time: time,
				declaration: "GamePlayTimer: ",
				count: 6
			})
		}
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
				declaration: `${this.state.time} Need ${3- this.state.users} more ${this.state.players} to start`
			})
		} else if (this.state.users === 2){
			this.setState({
				declaration: `${this.state.time} Need ${3- this.state.users} more player to start `
			})
		} else if (this.state.users > 2){
			this.setState({
				declaration: "Get Ready In: "
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
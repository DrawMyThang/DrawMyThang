import React from 'react'
import ChatBox from './chatBox.jsx'
import Canvas from './canvas.jsx'
//import openSocket from 'socket.io-client';


export default class App extends React.Component{
	constructor(){
		super()
	}

	render(){
		return(
			<div>
				<ChatBox />
				<Canvas />
			</div>
		
		)
	}

}
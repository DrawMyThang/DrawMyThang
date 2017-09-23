import React from 'react'
import ChatBox from './chatBox.jsx'
import Canvas from './canvas.jsx'
//import openSocket from 'socket.io-client';

// asdfjlsadf;fasafafsd;afds
//fskl;fdafdsa;afsdafsd;asdfkl;afsd
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
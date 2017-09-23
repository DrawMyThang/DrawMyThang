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
				<Canvas />
				<div className ="chatsUsers">
					 <section className="sidebar">
					    <div className = "users"> this will eventually be users box</div>
					    Chats
					    <ChatBox />
					 </section>
				 </div>
			</div>
		
		)
	}

}
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header.js';
import ChatBox from './chatBox.js';
import Canvas from './canvas.js';
//import openSocket from 'socket.io-client';

export default class App extends React.Component{
	constructor() {
		super()
	}

	render() {
		return (
			<div>
				<BrowserRouter>
					<Header />
				</BrowserRouter>
				<Canvas />
				<ChatBox/>
			</div>		
		);
	}
}
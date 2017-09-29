import React from 'react';
import Canvas from './canvas.jsx';
import socket from 'socket.io-client';

export default class CanvasColors extends React.Component {
	constructor(){
		super()
	}

	render(){
		return(
			<div>
				<div id="canvasColors">
				Canvas Colors
				</div>
			</div>
		)
	}
}
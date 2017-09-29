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
					<div className="color red"></div>
					<div className="color blue"></div>
					<div className="color black"></div>
					<div className="color yellow"></div>
				</div>
			</div>
		)
	}
}
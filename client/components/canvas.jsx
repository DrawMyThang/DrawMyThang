import React from 'react';
import socket from 'socket.io-client';

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isArtist: false,
    }
    this.drawLine = this.drawLine.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onDrawingEvent = this.onDrawingEvent.bind(this);
    this.throttle = this.throttle.bind(this);
    this.isArtist = this.isArtist.bind(this);
    this.wipeCanvas = this.wipeCanvas.bind(this);
    // this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.canvas = document.getElementById("draw-comp");
    this.context = this.canvas.getContext('2d');
    this.context.canvas.height = this.canvas.clientHeight;
    this.context.canvas.width = this.canvas.clientWidth;

    this.leftOffSet = this.canvas.offsetLeft;
    this.topOffSet = this.canvas.offsetTop;
    this.enableDraw = false;
    this.currentPos = {};

    this.canvas.addEventListener('mousemove', this.throttle(this.onMouseMove, 50), false);
    this.canvas.addEventListener('mousedown', this.onMouseDown, false);
    this.canvas.addEventListener('mouseup', this.onMouseUp, false);
    this.props.socket.on('drawing', this.onDrawingEvent);
    this.props.socket.on('choose artist', this.isArtist);
    this.props.socket.on('clear canvas', this.wipeCanvas);
  }

  isArtist(uid) {
    if (uid === this.props.uid) {
      this.state.isArtist = true;
    } else {
      this.state.isArtist = false;
    }
    this.enableDraw = false;
  }
  drawLine(x0, y0, x1, y1, emit) {
    
    this.context.beginPath();
    this.context.moveTo(x0, y0);
    this.context.lineTo(x1, y1);
    this.context.strokeStyle = 'black';
    this.context.lineWidth = 2;
    this.context.stroke();
    this.context.closePath();
    if (emit) {
      this.props.socket.emit('drawing', {
        x0: x0,
        y0: y0,
        x1: x1,
        y1: y1, 
      });
    }
  }

  wipeCanvas() {
    this.context.clearRect(0, 0, this.context.canvas.width
      ,this.context.canvas.height)
  }

  onMouseDown(e) {
    this.currentPos.x = e.clientX;
    this.enableDraw = true;
    this.currentPos.y = e.clientY;
  }

  onMouseUp(e) {
    if (this.enableDraw && this.state.isArtist) { 
      this.enableDraw = false;
      this.drawLine(this.currentPos.x - this.leftOffSet, this.currentPos.y - this.topOffSet
      , e.clientX - this.leftOffSet, e.clientY - this.topOffSet);
    }
  }

  onMouseMove(e) {
    if (this.enableDraw && this.state.isArtist) {
      this.drawLine(this.currentPos.x - this.leftOffSet, this.currentPos.y - this.topOffSet
      , e.clientX - this.leftOffSet, e.clientY - this.topOffSet, true);
      this.currentPos.x = e.clientX;
      this.currentPos.y = e.clientY;
    }
  }

  onDrawingEvent(data) {
    this.drawLine(data.x0, data.y0, data.x1, data.y1);
  }

  // handleClick() {
  //   this.props.socket.emit('choose artist');
  // }

  throttle(callback, delay) {
    let previousCall = new Date().getTime();
    return function() {
      let time = new Date().getTime();

      if ((time - previousCall) >= delay) {
        previousCall = time;
        callback.apply(null, arguments);
      }
    };
  }

  render() {
    return (
      <canvas id="draw-comp"></canvas> 
    );
  }
};

export default Canvas;

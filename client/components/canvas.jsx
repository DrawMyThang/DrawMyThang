import React from 'react';
import socket from 'socket.io-client';

class Canvas extends React.Component {
  constructor() {
    super();

    // this.socket = io();
    // this.canvas;
    // this.context;

    // this.leftOffSet;
    // this.topOffSet;
    // this.enableDraw;
    // this.currentPos;

    this.drawLine = this.drawLine.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onDrawingEvent = this.onDrawingEvent.bind(this);
    this.throttle = this.throttle.bind(this);
  }

  componentDidMount() {
    // this.socket = io();

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

  onMouseDown(e) {
    this.currentPos.x = e.clientX;
    this.enableDraw = true;
    this.currentPos.y = e.clientY;
  }

  onMouseUp(e) {
    if (this.enableDraw) { 
      this.enableDraw = false;
      this.drawLine(this.currentPos.x - this.leftOffSet, this.currentPos.y - this.topOffSet
      , e.clientX - this.leftOffSet, e.clientY - this.topOffSet);
    }
  }

  onMouseMove(e) {
    if (this.enableDraw) {
      this.drawLine(this.currentPos.x - this.leftOffSet, this.currentPos.y - this.topOffSet
      , e.clientX - this.leftOffSet, e.clientY - this.topOffSet, true);
      this.currentPos.x = e.clientX;
      this.currentPos.y = e.clientY;
    }
  }

  onDrawingEvent(data) {
    this.drawLine(data.x0, data.y0, data.x1, data.y1);
  }

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

$(document).ready(function(){
    var socket = io();
    var canvas = document.getElementById("draw-comp");
    var context = canvas.getContext('2d');
    context.canvas.height = canvas.clientHeight;
    context.canvas.width = canvas.clientWidth;

    var leftOffSet = canvas.offsetLeft;
    var topOffSet = canvas.offsetTop;
    var enableDraw = false;
    var currentPos = {};

    var drawLine = (x0, y0, x1, y1, emit) => {

        context.beginPath();
        context.moveTo(x0, y0);
        context.lineTo(x1, y1);
        context.strokeStyle = 'black';
        context.lineWidth = 2;
        context.stroke();
        context.closePath();
        if (emit) {
            socket.emit('drawing', {
                x0: x0,
                y0: y0,
                x1: x1,
                y1: y1, 
            });
        }
    }
    var onMouseDown = (e) => {
        enableDraw = true;
        currentPos.x = e.clientX;
        currentPos.y = e.clientY;
    }
    var onMouseUp = (e) => {
        if (enableDraw) { 
            enableDraw = false;
            drawLine(currentPos.x - leftOffSet, currentPos.y - topOffSet
            , e.clientX - leftOffSet, e.clientY - topOffSet);
        }
    }

    var onMouseMove = (e) => {
        if (enableDraw) {
            drawLine(currentPos.x - leftOffSet, currentPos.y - topOffSet
            , e.clientX - leftOffSet, e.clientY - topOffSet, true);
            currentPos.x = e.clientX;
            currentPos.y = e.clientY;
        }
    }

    var onDrawingEvent = (data) => {
        drawLine(data.x0, data.y0, data.x1, data.y1);
    };

    var throttle = (callback, delay) => {
        var previousCall = new Date().getTime();
        return function() {
          var time = new Date().getTime();
    
          if ((time - previousCall) >= delay) {
            previousCall = time;
            callback.apply(null, arguments);
          }
        };
    }

    canvas.addEventListener('mousemove', throttle(onMouseMove, 20), false);
    canvas.addEventListener('mousedown', onMouseDown, false);
    canvas.addEventListener('mouseup', onMouseUp, false);
    socket.on('drawing', onDrawingEvent);
    socket.on('client id', (clientId) => {
        console.log(clientId);
    })
});
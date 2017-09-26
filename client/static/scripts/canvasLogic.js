$(document).ready(function(){
    var socket = io();
    var canvas = document.getElementById("draw-comp");
    var context = canvas.getContext('2d');
    context.canvas.height = canvas.clientHeight;
    context.canvas.width = canvas.clientWidth;
    console.log(context);
    var leftOffSet = canvas.offsetLeft;
    var topOffSet = canvas.offsetTop;
    var enableDraw = false;
    var detectClick = (event) => {
        console.log(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    }

    var currentPos = {};

    var drawLine = (x0, y0, x1, y1) => {

        context.beginPath();
        context.moveTo(x0, y0);
        context.lineTo(x1, y1);
        context.strokeStyle = 'black';
        context.lineWidth = 2;
        context.stroke();
        context.closePath();

        socket.emit('drawing', {
            x0: x0,
            y0: y0,
            x1: x1,
            y1: y1, 
        });
    }
    var onMouseDown = (e) => {
        enableDraw = true;
        currentPos.x = e.clientX;
        currentPos.y = e.clientY;
    }
    var onMouseUp = () => {
        if (enableDraw) { 
            enableDraw = false;
            drawLine(currentPos.x - leftOffSet, currentPos.y - topOffSet
            , e.clientX - leftOffSet, e.clientY - topOffSet);
        }
    }

    var onMouseMove = (e) => {
        if (enableDraw) {
            drawLine(currentPos.x - leftOffSet, currentPos.y - topOffSet
            , e.clientX - leftOffSet, e.clientY - topOffSet);
            currentPos.x = e.clientX;
            currentPos.y = e.clientY;
        }
    }

    var onResize = () => {
        console.log(context.canvas);
    }

    var onDrawingEvent = (data) => {
        drawLine(data.x0, data.y0, data.x1, data.y1);
    };

    canvas.addEventListener('click', detectClick, false);
    canvas.addEventListener('mousemove', onMouseMove, false);
    canvas.addEventListener('mousedown', onMouseDown, false);
    canvas.addEventListener('mouseup', onMouseUp, false);
    window.addEventListener('resize', onResize, false);
    socket.on('drawing', onDrawingEvent);
    
});
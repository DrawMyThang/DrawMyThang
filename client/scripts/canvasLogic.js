$(document).ready(function(){
    var canvas = document.getElementById("draw-comp");
    var context = canvas.getContext('2d');
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
    }
    var onMouseDown = (e) => {
        enableDraw = true;
        currentPos.x = e.clientX;
        currentPos.y = e.clientY;
    }
    var onMouseUp = () => {
        enableDraw = false;
    }

    var onMouseMove = (e) => {
        if (enableDraw) {
        drawLine(currentPos.x - leftOffSet, currentPos.y - topOffSet
        , e.clientX - leftOffSet, e.clientY - topOffSet);
        currentPos.x = e.clientX;
        currentPos.y = e.clientY;
        }
    }

    canvas.addEventListener('click', detectClick, false);
    canvas.addEventListener('mousemove', onMouseMove, false);
    canvas.addEventListener('mousedown', onMouseDown, false);
    canvas.addEventListener('mouseup', onMouseUp, false);

});
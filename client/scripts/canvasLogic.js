$(document).ready(function(){
    var canvas = document.getElementById("draw-comp");
    console.log(document.getElementById("draw-comp"));
    var context = canvas.getContext('2d');
    var enableDraw = false;
    context.fillStyle = "#FF0000";
    var draw = function (mouseX, mouseY) {
        context.beginPath();
        context.fillRect(20, 20, 150, 100);
    };

  
    var test = function (event) {
        if (enableDraw) {
            console.log(event.clientX);
            console.log(event.clientY);
        }
    }   
    $('#draw-comp').mousemove(test);

    $('#draw-comp').mousedown(() => {
        enableDraw = true;
    });
    $('#draw-comp').mouseup(() => {
        enableDraw = false
    });
    draw();
});
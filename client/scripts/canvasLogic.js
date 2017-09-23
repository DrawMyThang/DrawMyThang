$(document).ready(function(){
    var canvas = document.getElementById("draw-comp");
    console.log(document.getElementById("draw-comp"));
    var context = canvas.getContext('2d');
    context.fillStyle = "#FF0000";
    var draw = function () {
        context.beginPath();
        context.fillRect(20, 20, 150, 100);
    };

    draw();
});
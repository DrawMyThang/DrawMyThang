const express = require('express');
const path = require('path');
const socket = require('socket.io');
const bodyParser = require('body-parser');

const app = express();

const port = 8080;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/static')));

const server = app.listen(port, () => {
  console.log(`Server is listening on: ${port}`);
});

// socket set up 
const io = socket(server);


const userArr = [];

let countdown = 100; 

setInterval(() => {  
  countdown--;
  console.log(countdown, "countdown")
  io.emit('timer', countdown);
}, 1000);

io.on('connection', (socks) => {
  console.log('user is connected id:', socks.id);

	socks.on('drawing', (drawData) => {
		io.emit('drawing', drawData);
	});


  socks.on('chat message', (msg) => {
    console.log('message: ', msg, 'id: ', socks.id);
    io.emit('chat message', msg);
  });

  socks.on('user id', () => {
    userArr.push(socks.id)
    console.log(userArr, 'userArr')
    io.emit('user id', userArr)
    console.log("user id emitting", userArr)
  });

  socks.on('reset', function (data) {
    countdown = 60;
    io.sockets.emit('timer', countdown);
  });
 

  socks.on('disconnect', () => {
    if (userArr.includes(socks.id)){
      userArr.splice(userArr.indexOf(socks.id), 1)
      io.emit('disconnect', userArr)
    }
    console.log(userArr, "userArr after disconnect")
    console.log('user ', socks.id, ' disconnected');
  });


});

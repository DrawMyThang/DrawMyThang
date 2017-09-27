const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');
const db = require('../db/db.js');

const socket = require('socket.io');
//const bodyParser = require('body-parser');


// express app and socket.io instantiation
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const PORT = process.env.PORT || 8080;

//app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/static')));

const userArr = [];

io.on('connection', (socks) => {

	socks.on('drawing', (drawData) => {
		io.emit('drawing', drawData);
	});

  socks.on('chat message', (msg) => {
    console.log('message: ', msg, 'id: ', socks.id);
    io.emit('chat message', msg);
  });

  socks.on('user id', () => {
    userArr.push(socks.id);
    console.log(userArr, 'userArr');
    io.emit('user id', userArr);
    console.log("user id emitting", userArr);
  });

  socks.on('timer', (data) => {
    console.log('here in timer');
    let countdown = 6;
    let count = 0;
    const setInt = setInterval(() => {  
      countdown--;
      if (countdown === -1 && count === 0) {
        count = 1;
        countdown = 60;
        //countdown = 60;
      } else if ( countdown === -1 && count > 0){
        countdown = "stop"
        myStopFunction();
      }
      console.log(countdown, "countdown");
      io.emit('timer', countdown);
      }, 1000);

    const myStopFunction = () => {
      clearInterval(setInt);
    }
  });
 
  socks.on('disconnect', () => {
    if (userArr.includes(socks.id)) {
      userArr.splice(userArr.indexOf(socks.id), 1);
      io.emit('disconnect', userArr);
    }

    console.log(userArr, "userArr after disconnect");
    console.log('user ', socks.id, ' disconnected');

  });

});

server.listen(PORT, () => {
	console.log(`Server is listening on: ${PORT}`);
});

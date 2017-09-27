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
var artist = 0;

io.on('connection', (socks) => {
	userArr.push(socks.id);
	console.log(socks.id, 'userArr');
	
	socks.on('choose artist', () => {
		io.emit('choose artist', userArr[artist]);
		if(artist + 1 >= userArr.length) {
			artist = 0;
		} else {
			artist++;
		}
	});

	socks.on('drawing', (drawData) => {
		io.emit('drawing', drawData);
	});

  socks.on('chat message', (msg) => {
    //console.log('message: ', msg, 'id: ', socks.id);
    io.emit('chat message', msg);
  });

  socks.on('user id', () => {
		io.emit('user id', userArr);
  });

  socks.on('timer', (data) => {

  if (userArr.length >= 2){
    console.log('here in timer');
    let countdown = 6;
    let count = 0;
    const setInt = setInterval(() => {  
      countdown--;
      if (countdown === -1 && count === 0) {
        count = 1;
        countdown = 60;
      } else if ( countdown === -1 && count > 0){
        countdown = "stop"
        myStopFunction();
      }
      io.emit('timer', countdown);
      }, 1000);

    const myStopFunction = () => {
      clearInterval(setInt);
    }
  }
})
   
 
  socks.on('disconnect', () => {
		var disconnectId = socks.id;
    if (userArr.includes(disconnectId)) {
      userArr.splice(userArr.indexOf(disconnectId), 1);
      io.emit('disconnect', userArr);
    }

    console.log(userArr, "userArr after disconnect");
    console.log('user ', disconnectId, ' disconnected');

  });

});

server.listen(PORT, () => {
	console.log(`Server is listening on: ${PORT}`);
});

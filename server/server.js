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

  socks.on('timer', function (data) {
    console.log('here in timer')
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
        myStopFunction()
      }
      console.log(countdown, "countdown")
     io.emit('timer', countdown);
      }, 1000);

    const myStopFunction = () => {
      clearInterval(setInt);
    }
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

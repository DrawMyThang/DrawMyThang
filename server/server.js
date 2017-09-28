const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');
const db = require('../db/db.js');
const utils = require('./utils/dictionaryapi.js');
const socket = require('socket.io');

// express app and socket.io instantiation
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const PORT = process.env.PORT || 8080;

const usernames_uid = {};
const userArr = [];
let numOfUsers = 0;
var artist = 0;
var flag = false;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/static')));


app.get('/users', (req, res) => {
  res.status(200).json(usernames_uid);
});

io.on('connection', (socks) => {
  
  socks.on('connect user', (user) => {
    if (!usernames_uid.hasOwnProperty(user.uid)) {
      usernames_uid[user.uid] = user;
    }

    if (!user.displayName) {
      io.emit('display users', user.uid);
    } else {
      io.emit('display users', user.displayName);
    }
    numOfUsers++
    console.log('number of users ', numOfUsers);
    // console.log('----------------');
    // console.log(usernames_uid);
  });

  socks.on('disconnect', () => {
    var disconnectId = socks.id;
    if (userArr.includes(disconnectId)) {
      userArr.splice(userArr.indexOf(disconnectId), 1);
      io.emit('disconnect', userArr);
    }

    //console.log(userArr, "userArr after disconnect");
    //console.log('user ', disconnectId, ' disconnected');

  });
  
  socks.on('choose artist', () => {
    io.emit('choose artist', userArr[artist]);
    if(artist + 1 >= userArr.length) {
      artist = 0;
    } else {
      artist++;
    }
  });

  socks.on('drawing', (drawData) => {
    //console.log(socks.id, 'drawing id socks')
    io.emit('drawing', drawData);
  });

  socks.on('chat message', (msg) => {
    //console.log('message: ', msg, 'id: ', socks.id);
    io.emit('chat message', socks.id + ": " + msg);
  });

  socks.on('user id', () => {
    userArr.push(socks.id);
    io.emit('user id', userArr);
  });


  if (numOfUsers === 3 && flag===false){
    //console.log(socks.id, 'timer id ')
    flag = true;
    //console.log(userArr, 'userArr in timer')
    //console.log('here in timer');
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
      flag = false;
      clearInterval(setInt);
    }
  }
   
  // socks.on('disconnect', () => {
  // 	var disconnectId = socks.id;
  //   if (userArr.includes(disconnectId)) {
  //     userArr.splice(userArr.indexOf(disconnectId), 1);
  //     io.emit('disconnect', userArr);
  //   }

  //   //console.log(userArr, "userArr after disconnect");
  //   //console.log('user ', disconnectId, ' disconnected');

  // });

});

server.listen(PORT, () => {
  console.log(`Server is listening on: ${PORT}`);
});

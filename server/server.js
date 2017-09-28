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

const usernames_uid = {
  first: {
    displayName: 'leonardo',
    photoURL: null,
    uid: 'first',
  },
  second: {
    displayName: 'donatello',
    photoURL: null,
    uid: 'second',
  },

};

let numOfUsers = 2;
var artist = 0;
var flag = false;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/static')));

io.on('connection', (socks) => {
  
  socks.on('get users', () => {
    io.emit('get users', usernames_uid);
  });

  socks.on('connect user', (user) => {
    if (!usernames_uid.hasOwnProperty(user.uid)) {
      usernames_uid[user.uid] = user;
    }
    io.emit('display users', user.displayName);
    numOfUsers++;
    

     if (numOfUsers === 3 && flag===false){
    flag = true;
    let countdown = 6;
    let count = 0;
    const setInt = setInterval(() => {  
      countdown--;
      if (countdown === -1 && count === 0) {
        count = 1;
        countdown = 60;
        const keys = Object.keys(usernames_uid);
        const currArtist = usernames_uid[keys[artist]].uid;
        io.emit('choose artist', currArtist);
        utils.get_random_word(io, currArtist);
        if(artist + 1 >= keys.length) {
          artist = 0;
        } else {
          artist++;
        }
        console.log('artist ', usernames_uid[keys[artist]].uid);
      } else if ( countdown === -1 && count > 0){
        countdown = 6;
        count = 0;
        // myStopFunction();
        io.emit('clear canvas');
      }
      io.emit('timer', countdown);
      }, 100);

    // const myStopFunction = () => {
    //   flag = false;
    //   clearInterval(setInt);
    // }
  }

  });

  socks.on('disconnect user', (user) => {
    if (usernames_uid.hasOwnProperty(user.uid)) {
      delete usernames_uid[user.uid];
      numOfUsers--;
      io.emit('get users', usernames_uid);
    }
  });
  
  socks.on('choose artist', () => {

    const keys = Object.keys(usernames_uid);
    io.emit('choose artist', usernames_uid[keys[artist]].uid);
    if(artist + 1 >= keys.length) {
      artist = 0;
    } else {
      artist++;
    }
  });

  socks.on('drawing', (drawData) => {
    //console.log(socks.id, 'drawing id socks')
    io.emit('drawing', drawData);
  });

  socks.on('chat message', (data) => {
    //console.log('message: ', msg, 'id: ', socks.id);
    if (data.user.uid !== '') {
      io.emit('chat message', data.user.displayName + ": " + data.message);
    }
  });

  socks.on('numOfUsers', () => { 
    console.log(numOfUsers, 'numOfUsers')
    io.emit('numOfUsers', numOfUsers);
  });


 

});

server.listen(PORT, () => {
  console.log(`Server is listening on: ${PORT}`);
});

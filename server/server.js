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

// dummy values
const usernames_uid = {
  first: {
    displayName: 'leonardo',
    photoURL: null,
    uid: 'first',
    points: 0
  },
  second: {
    displayName: 'donatello',
    photoURL: null,
    uid: 'second',
    points: 0
  },
};

let numOfUsers = 2;
let artist = 0;
let flag = false;
let currWord = '';
let winner = false;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/static')));

io.on('connection', (socks) => {
  
  socks.on('get users', () => {
    io.emit('get users', usernames_uid);
  });

  socks.on('erase canvas', () => {
    io.emit('clear canvas');
  });

  socks.on('connect user', (user) => {
    if (!usernames_uid.hasOwnProperty(user.uid)) {
      user.points = 0;
      usernames_uid[user.uid] = user;
    }
    io.emit('display users', user);
    numOfUsers++;
    
    if (numOfUsers === 3 && !flag){
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
          utils.get_random_word(io, currArtist, (word) => {
            currWord = word.toLowerCase();
          });

          if(artist + 1 >= keys.length) {
            artist = 0;
          } else {
            artist++;
          }
        } else if ( (countdown === -1 && count > 0) || winner){
          countdown = 6;
          count = 0;
          winner = false;
					io.emit('clear canvas');
					
					if (numOfUsers < 3 && flag) {
						myStopFunction(setInt);
					}
        }
        io.emit('timer', countdown);
      }, 1000);
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
    io.emit('drawing', drawData);
  });

  socks.on('chat message', (data) => {
    if (data.user.uid !== '') {
      let guess = data.message.replace(/\s+/g, '').toLowerCase();
      console.log('user guess', guess);
      io.emit('chat message', [data.user.displayName + ": ", data.message, data.user.photourl]);
      if (guess === currWord) {
        winner = true;
        usernames_uid[data.user.uid].points++;
        io.emit('get users', usernames_uid);
        console.log('winner winner chicken dinner');
      }
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

const myStopFunction = (setInt) => {
	flag = false;
	clearInterval(setInt);
};

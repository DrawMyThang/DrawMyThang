const express = require('express');
const path = require('path');
const socket = require('socket.io');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

const port = 3000;

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../client/static')));

// socket set up 

const io = socket(app);

io.on('connection', (socks) => {
  console.log('user is connected id:', socks.id);

  socks.on('chat message', (msg) => {
    console.log('message: ', msg);
    io.emit('chat message', msg);
  });

  socks.on('disconnect', () => {
    console.log('user ', socks.id, ' disconnected');
  });
});

app.listen(3000, () => {
  console.log(`Server is listening on: ${port}`);
});

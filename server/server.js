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

io.on('connection', (socks) => {
  console.log('user is connected id:', socks.id);

  socks.on('chat message', (msg) => {
    console.log('message: ', msg, 'id: ', socks.id);
    io.emit('chat message', msg);
  });

  socks.on('disconnect', () => {
    console.log('user ', socks.id, ' disconnected');
  });
});

const express = require('express')
const path = require('path')
const socket = require('socket.io')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const app = express()

let port = 3000

const server = app.listen(3000, ()=>{
	console.log("Server is listening on: " + port)
})
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, '../client/static') ))

//socket set up 

const io = socket(server)

io.on('connection', (socket)=>{
	console.log('user is connected id:', socket.id)

	socket.on('chat message', function(msg){
	console.log('message: ' + msg );
	 io.emit('chat message', msg);
  	});

	socket.on('disconnect', function(){
    console.log('user ' + socket.id +' disconnected');
  });
})


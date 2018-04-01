const path = require('path'); //standard node module
const http = require('http'); //standard node module
const express = require('express');
const socketIO = require('socket.io')

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname,'..','/public');
let port = process.env.PORT || 3000;

let app = express();
let server = http.Server(app);
let io = socketIO(server);


app.use(express.static(publicPath));

//add and event lisnet connection
io.on('connection', (socket)=> {
	console.log('New user connected');

	socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));
	socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'));
	// socket.broadcast.emit('alert');

	socket.on('createMessage', (message,callback)=>{
		console.log('Create message :',message)
		io.emit('newMessage',generateMessage(message.from,message.text))
		callback('This is from the server');
		//with brodcast everyone receive my message except me
		// socket.broadcast.emit('newMessage',{
		// 	from : message.from,
		// 	text : message.text,
		// 	createdAt: new Date().getTime()
		// })
	});

	socket.on('disconnect',()=>{
		console.log('User was disconnected')
	});
});

	


server.listen(port, ()=> {
  console.log(`Server is up on port ${port}!`);
});




// socket.emit('message', "this is a test"); //sending to sender-client only
// socket.broadcast.emit('message', "this is a test"); //sending to all clients except sender
// socket.broadcast.to('game').emit('message', 'nice game'); //sending to all clients in 'game' room(channel) except sender
// socket.to('game').emit('message', 'enjoy the game'); //sending to sender client, only if they are in 'game' room(channel)
// socket.broadcast.to(socketid).emit('message', 'for your eyes only'); //sending to individual socketid
// io.emit('message', "this is a test"); //sending to all clients, include sender
// io.in('game').emit('message', 'cool game'); //sending to all clients in 'game' room(channel), include sender
// io.of('myNamespace').emit('message', 'gg'); //sending to all clients in namespace 'myNamespace', include sender
// socket.emit(); //send to all connected clients
// socket.broadcast.emit(); //send to all connected clients except the one that sent the message
// socket.on(); //event listener, can be called on client to execute on server
// io.sockets.socket(); //for emiting to specific clients
// io.sockets.emit(); //send to all connected clients (same as socket.emit)
// io.sockets.on() ; //initial connection from a client.
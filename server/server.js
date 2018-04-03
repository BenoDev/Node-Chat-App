const path = require('path'); //standard node module
const http = require('http'); //standard node module
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage,generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validations');
const {Users} = require('./utils/users')
const publicPath = path.join(__dirname,'..','/public');
let port = process.env.PORT || 3000;

let app = express();
let server = http.Server(app);
let io = socketIO(server);
let users = new Users();


app.use(express.static(publicPath));

//add and event lisnet connection
io.on('connection', (socket)=> {
	console.log('New user connected');

	
	// socket.broadcast.emit('alert');

	socket.on('join',(params,callback)=>{
		if(!isRealString(params.name) || !isRealString(params.room)){
			return callback('Name and room name are required')
		}
		socket.join(params.room);
		users.removeUser(socket.id);
		users.addUser(socket.id,params.name,params.room);

		io.to(params.room).emit('updateUserList',users.getUserList(params.room))


		socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));
		socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin', `${params.name} has joined`));
		callback();
	});

	socket.on('createMessage', (message,callback)=>{
		let user = users.getUser(socket.id);
		
		if(user && isRealString(message.text)){
			io.to(user.room).emit('newMessage',generateMessage(user.name,message.text))
		}
		
		callback();
		

	});
	socket.on('createLocationMessage',(coords)=>{
			let user = users.getUser(socket.id);
			if(user){
			io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name,coords.latitude, coords.longitude))
			}
		});

	socket.on('disconnect',()=>{
		let user = users.removeUser(socket.id);
		if(user){
			io.to(user.room).emit('updateUserList',users.getUserList(user.room))
			io.to(user.room).emit('newMessage',generateMessage('Admin', `${user.name} has left`))
		}
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
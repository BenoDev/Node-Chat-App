const path = require('path'); //standard node module
const http = require('http'); //standard node module
const express = require('express');
const socketIO = require('socket.io')

const publicPath = path.join(__dirname,'..','/public');
let port = process.env.PORT || 3000;

let app = express();
let server = http.Server(app);
let io = socketIO(server);


app.use(express.static(publicPath));

//add and event lisnet connection
io.on('connection', (socket)=> {
	console.log('New user connected');

	socket.emit('newMessage',{
		from:'admin',
		text:'Welcome to Beno chat',
		createdAt: new Date().getTime()
	});
	socket.broadcast.emit('newMessage',{
		from:'admin',
		text:'New user joined',
		createdAt: new Date().getTime()
	});
	// socket.broadcast.emit('alert');

	socket.on('createMessage', (message)=>{
		console.log('Create message :',message)
		io.emit('newMessage',{
			from : message.from,
			text : message.text,
			createdAt: new Date().getTime()
		})

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
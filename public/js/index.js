var socket = io(); //make request to server to open connection
    	socket.on('connect',function () {
    		console.log('Connect to server')
		
		socket.emit('createMessage',{
    		from :'Gino',
    		text : 'Hi Beno'
    	});	

    	});


    	socket.on('disconnect',function () {
    		console.log('Disconnected from the server')
    	});

    	socket.on('newMessage', function(message){
    		console.log('New Message',message);
    	});
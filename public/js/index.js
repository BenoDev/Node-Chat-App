var socket = io(); //make request to server to open connection
    	socket.on('connect',function () {
    		console.log('Connect to server')

    	});


    	socket.on('disconnect',function () {
    		console.log('Disconnected from the server')
    	});

    	socket.on('newMessage', function(message){
    		console.log('New Message',message);
    		let li = jQuery('<li></li>');
    		li.text(`${message.from}: ${message.text}`);

    		jQuery('#messages').append(li);
    	});

    

    	jQuery('#message-form').on('submit',function(e){
			e.preventDefault();
			socket.emit('createMessage',{
				from: 'User',
				text: jQuery('[name=message').val()
			},function(){

			});
    	})
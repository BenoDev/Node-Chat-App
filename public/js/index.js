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

    	socket.on('newLocationMessage', function(message){
			var li = jQuery('<li></li>');
			var a = jQuery('<a target = "_blank">My current location</a>');
			li.text(`${message.from}: `);
			a.attr('href',message.url);
			li.append(a);
			jQuery('#messages').append(li);
    	});

    	jQuery('#message-form').on('submit',function(e){
			e.preventDefault();
			
			var messageTextbox = jQuery('[name=message]');

			socket.emit('createMessage',{
				from: 'User',
				text:  messageTextbox.val()
			},function(){
				 messageTextbox.val('')
			});
    	})

    	var locationButton = jQuery('#send-location');

    	locationButton.on('click', function(){
			if(!navigator.geolocation){
				return alert('Geolocation not supportted from your browser')
			}
			locationButton.prop("disabled", true).text('Sending location...')

			navigator.geolocation.getCurrentPosition(function(position){
				locationButton.prop("disabled", false).text('Send location');
				socket.emit('createLocationMessage',{
					latitude:position.coords.latitude,
					longitude : position.coords.longitude
				})
			},function(){
				locationButton.prop("disabled", false).text('Send location');
				alert('Unable to fetch location')
			})
    	});
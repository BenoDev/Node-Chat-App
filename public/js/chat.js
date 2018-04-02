var socket = io(); //make request to server to open connection
    	socket.on('connect',function () {
    		console.log('Connect to server')

    	});

    	function scrollToBottom() {
			//selector
			var messages = jQuery('#messages');
			var newMessage =messages.children('li:last-child')
			//heigth
			var clientHeight = messages.prop('clientHeight');
			var scrollTop =messages.prop('scrollTop');
			var scrollHeight =messages.prop('scrollHeight');
			var newMessageHeight = newMessage.innerHeight();
			var lastMessageHeight = newMessage.prev().innerHeight();
			if(clientHeight+scrollTop + newMessageHeight +lastMessageHeight >= scrollHeight){
				messages.scrollTop(scrollHeight);
			}
    	}


    	socket.on('disconnect',function () {
    		console.log('Disconnected from the server')
    	});

    	socket.on('newMessage', function(message){
    		var formattedTime = moment(message.createdAt).format('h:mm a');
    		var template = jQuery('#message-template').html();
    		var html = Mustache.render(template,{
    			text: message.text,
    			from: message.from,
    			createdAt:formattedTime
    		});
    		jQuery('#messages').append(html)
			scrollToBottom();
    		// let li = jQuery('<li></li>');
    		// li.text(`${message.from} ${formattedTime}: ${message.text}`);

    		// jQuery('#messages').append(li);
    	});

    	socket.on('newLocationMessage', function(message){
    		var formattedTime = moment(message.createdAt).format('h:mm a');
    		var template = jQuery('#location-message-template').html();
    		var html = Mustache.render(template,{
    			text: message.text,
    			url: message.url,
    			createdAt:formattedTime
    		});
    		jQuery('#messages').append(html);
    		scrollToBottom();
   //  		var formattedTime = moment(message.createdAt).format('h:mm a');

			// var li = jQuery('<li></li>');
			// var a = jQuery('<a target = "_blank">My current location</a>');
			// li.text(`${message.from} ${formattedTime}: `);
			// a.attr('href',message.url);
			// li.append(a);
			// jQuery('#messages').append(li);
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
const expect = require('expect');

const {generateMessage,generateLocationMessage} = require('./message')

describe('generateMessage', () =>{
	it('should generate correct message object', () =>{
		const from = 'Beno';
		const text = 'Some message'
		let message = generateMessage(from,text);
		// expect(message.from).toBe(from);
		expect(message).toMatchObject({from,text});
		expect(typeof message.createdAt).toBe('number')
	});
});

describe('generateLocationMessage', () =>{
	it('should generate correct location message object', () =>{
		const from = 'Beno';
		const lat = 1;
		const lng = 2;

		let locationMessage = generateLocationMessage(from,lat,lng);
		// expect(message.from).toBe(from);
		expect(locationMessage.from).toBe(from);
		expect(typeof locationMessage.createdAt).toBe('number');
		expect(locationMessage.url).toBe(`https://www.google.com/maps?q=${lat},${lng}`)
	});
});
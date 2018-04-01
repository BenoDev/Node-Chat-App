const expect = require('expect');

const {generateMessage} = require('./message')

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
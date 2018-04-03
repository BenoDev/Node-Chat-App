const expect = require('expect');

const {isRealString} = require('./validations');

describe('validations: isRealString', ()=>{
	it('should reject non-string value',()=>{
		let result = isRealString(123);
		expect(result).toBe(false);
		
	});
	it('should reject string with only spaces',()=>{
		let result = isRealString('             ');
		expect(result).toBe(false);	
	});
	it('should allow string with space',()=>{
		let result = isRealString('    Beno    ');
		expect(result).toBe(true);
	});

})
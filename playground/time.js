const moment = require('moment');


// let date = moment();
// date.add(100,'year').subtrac(9,'months')
// console.log(date.format('Do MMM YYYY'));
let createdAt = 1234;
var someTimestmp= moment().valueOf();
let date = moment(createdAt);


console.log(date.format('h:mm a'))
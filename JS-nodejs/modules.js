const groupOne = require('./people');

// const { people } = require('./people'); USE THIS(DESTRUCTURING METHOD) IF YOU WANT TO IMPORT SPECIFIC DATA FROM A MODULE or EXTRACT DATA FROM AN OBJECT OR ARRAY

// console.log(groupOne); // this will return empty object unless you use module.exports = people in people.js, then it will return the valye of that variable
// console.log(people); // you cannot directyly access the value of this because it is not defined here

const os = require('os'); // for operating system

console.log(os.platform(), os.homedir());

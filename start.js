const fs = require('fs');
const data = fs.readFileSync('./data.txt', { encoding: 'utf8', flag: 'r' });

const dataObj = JSON.parse(data);






console.log();
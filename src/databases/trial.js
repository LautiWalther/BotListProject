const fs = require('fs');

const db = require('./servers.json');

var servidor = "servidor1";

console.log(db[servidor]);

console.log(db);
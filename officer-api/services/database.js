const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
function openConnection (){
    return open({filename: process.env.DB_PATH,driver: sqlite3.Database});
}
module.exports = openConnection
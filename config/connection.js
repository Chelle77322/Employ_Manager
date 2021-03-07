const mysql = require("mysql");
const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') 
})


console.log(path);
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
console.log(process.env['DB_USER']);
connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  // console.log("connected as id " + connection.threadId);
  // console.log("--------------------------------------");
});

module.exports = connection;

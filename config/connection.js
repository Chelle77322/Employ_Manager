const mysql = require("mysql");
const util = require("util");
const path = require("path");
require('dotenv').config({path: __dirname +`/../env`});
//Creates the connection to the mysql database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port : process.env.PORT
});

//console.log(process.env[`DB_HOST`]);
//console.log(process.env[`DB_USER`]);
//console.log(process.env[`DB_PASSWORD`]);
//console.log(process.env[`DB_NAME`]);
//console.log(process.env[`PORT`]);
//console.log(connection);


connection.connect((error)=>{
  if (error) throw error;
   console.error("error connecting: " + error.stack);
  console.log(`connected as id ${connection.threadId}\n`);

  
});

module.exports = connection;

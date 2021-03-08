const mysql = require("mysql");
const util = require("util");
const path = require("path");
require('dotenv').config({path:__dirname + `/.env`});


const connection = mysql.createConnection({
  host: `${process.env.DB_HOST}`,
  user: `${process.env.DB_USER}`,
  password: `${process.env.DB_PASSWORD}`,
  database: `${process.env.DB_NAME}`,
  port : `${process.env.PORT}`
});



connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
   console.log("--------------------------------------");
});

module.exports = connection;

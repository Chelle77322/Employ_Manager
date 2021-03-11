const path = require ('path');
const Sequelize = require('sequelize');
require ('dotenv').config({path: __dirname +`/../env`});

//Accessing the environment variables to use to connect to mySQL database employment_managementDB

const sequelize = new Sequelize (
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  process.env.DB_HOST,
  process.env.PORT,
  process.env.DIALECT,
  {
    host:'localhost',
    dialect:'mysql',
    port: 3306
  }
);


module.exports = sequelize;

//const util = require("util");
//const path = require("path");
//require('dotenv').config({path: __dirname +`/../env`});
//Creates the connection to the mysql database
//const connection = mysql.createConnection({
  //host: process.env.DB_HOST,
  //user: process.env.DB_USER,
  //password: process.env.DB_PASSWORD,
  //database: process.env.DB_NAME,
  //port : process.env.PORT
//});
//mySQL connection to check for error on connect
//connection.connect((error) =>{
  //if (error) throw error;
   //console.error("error connecting: " + error.stack);
  //console.log(`connected as id ${connection.threadId}\n`);

  
//});



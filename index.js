//Declares the npm packages required for the scripts to work
const logo = require('asciiart-logo');
const mysql = require('mysql');
const {prompt}= require ('inquirer');
const db = ("./db");
const table = require('table');
require('dotenv').config();

//Accesses the env file to set the connection to the mySQL database schema
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    address: process.env.SERVER_ADDRESS
    
});
console.log ("You are connected to" + connection);

//Accesses the modules for inquirer prompt
  const menuChoices = require('./lib/choices');
  const userPrompt = require ('./lib/userPrompt');
init();
  //Loads the ascii logo 
  function init() {
   
    const EMlogo = logo ({ name: "Employment Manager",logoColor: 'magenta', borderColor: 'magenta', textColor: 'magenta' }).render();
  
    console.log(EMlogo);
  
  }
  
  
    


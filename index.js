const mysql = require('mysql');
const inquirer = require('inquirer');
const db = ("./db");
require('dotenv').config();

//Makes the connection to the employment_database via the env
const port = process.env.PORT;
const address = process.env.SERVER_ADDRESS;

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    
});

  const menuChoices = require('./lib/choices');
    


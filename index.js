const mysql = require('mysql');
const inquirer = require('inquirer');
require('dotenv').config();

//Makes the connection to the employment_database via the env
var DB = require('DB');
DB.connect({
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD

});
console.log('Connected to'`${DB}`);
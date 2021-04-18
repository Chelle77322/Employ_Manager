//Declares the npm packages required for the scripts to work
const logo = require('asciiart-logo');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const path = require("path");

//Sequelize Connection information
const express = require('express');
const sequelize = require('./config/connection.js');
const app = express();

//Declaring variable for ORM part
const orm = require("./config/objectRM.js");
const promptUser = require("./lib/userPrompt");
const table = require('console.table');
const start = require('./lib/inquirer.js');

//App Settings
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//Sequelize Authentication is here
sequelize.authenticate().then(()=>{
    console.log('Connection to mySQL database has been established');
}).catch(error =>{
    console.log('We are unable to connect to the mySQL database', error);
}).finally (() =>{
    sequelize.close();
    startMenu();
});

init();
//Loads the ascii logo 
 function init() {
   
const EMlogo = logo ({ name: "Employment Manager",logoColor: 'magenta', borderColor: 'magenta', textColor: 'magenta' }).render();
console.log(EMlogo);
  
};
const startInquirer = require('./lib/inquirer.js');
const typeInquire = ['input', 'confirm', 'list'];
const userPrompt = require('./lib/userPrompt.js');
const choices = require ('./lib/choices.js');

//const querySQL = require('./lib/querySQL.js');

//Gives the user a menu 
const startMenu = () => {
    return inquirer.prompt ({
        name: "takeAction",
        type: "list",
        message: "Please make a selection from the list below:",
        choices:
        [
            "Click to view all current employees",
            "Click to view all departments",
            "Click to view all roles",
            "Click to add a new employee",
            "Click to add a new department",
            "Click to add a new role",
            "Click to remove an employee",
            "Click to remove a department",
            "Click to remove a role",
            "Click to view total department wage",
            "Click to view all employees by manager",
            "Click to update an employee's role",
            "Click to modify an employee's manager",
            "Click to finish program",
        ],
    }).then((takeAction)=>{

switch (takeAction) {

case `Click to view all current employees`:
    //Returns all employees
    menuViewEmployees();
    break;

case `Click to view all departments`:
    menuViewDepartments();
     break;

case `Click to view all roles`:
    menuViewRoles();
    break;

case `Click to view all employees by manager`:
        menuViewByManager();
    break;
    //All creating records here
    case `Click to add a new employee`:
        menuCreateEmployee();
    break;
case `Click to add a new department`:
        menuCreateDepartment();
      
    break;
case `Click to add a new role`:
        menuCreateRole();
       
    break;
//All modifications to records are met here
case `Click to modify an employees manager`:
    menuModifyEmployeeManager();
    break;
case `Click to update an employees role`:
    menuUpdateEmployeeRole();
    break;
//All deletions to records in database here
case `Click to remove an employee`:
    menuDeleteEmployee();
  break;
case `Click to remove a role`:
        menuDeleteRole();   
    break;
case `Click to remove a department`:
            menuDeleteDepartment();
    break;
case `Finish`:
    orm.endConnection();
    console.log(orm.endConnection());
    return;
    default:
    break;
};
        });
};
//View all employees function
function menuViewEmployees() {
    console.log("Viewing all current employees\n");
    var query = `SELECT employees.id, employees.first_name, employees.last_name, roles.salary, CONCAT(manager.first_name,' ', manager.last_name) AS manager FROM employees  LEFT JOIN roles ON employees.roles.id = roles.id LEFT JOIN departments ON departments.id = roles.departments.id LEFT JOIN employees.manager ON manager.id = employees.manager.id`

    sequelize.query(query, function(error, result){
        if(error) throw error;
       console.table(result.length);
        startMenu();
    })
};
// view all departments in the database
function menuViewDepartments() {
    var query = 'SELECT * FROM departments';
    sequelize.query(query, function(error, result) {
        if(error)throw error;
        console.table('All Departments:', result);
        options();
    })
  };
  // view all roles in the database
function menuViewRoles() {
    var query = 'SELECT * FROM roles';
    sequelize.query(query, function(error, result){
        if (error) throw error;
        console.table('All Roles:', result);
        options();
    })
  };





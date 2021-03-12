//Declares the npm packages required for the scripts to work
const logo = require('asciiart-logo');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const path = require("path");
//Sequelize Connection information
const express = require ('express');
const sequelize = require('./config/connection.js');
const app = express();
const PORT = process.env.PORT

//Declaring variable for ORM part
const orm = require("./config/objectRM.js");
const promptUser = require("./config/userPrompt.js");
const table = require('console.table');
const { Sequelize } = require('sequelize');

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

    sequelize.authenticate().then(() => {
        console.log('Connection established successfully.');
      }).catch(error => {
        console.error('Unable to connect to the database:', error);
      }).finally(() => {
        sequelize.close();
        startMenu();
      });
     

init();
//Loads the ascii logo 
 function init() {
   const EMlogo = logo ({ name: "Employment Manager",logoColor: 'magenta', borderColor: 'yellow', textColor: 'magenta' }).render();
    console.log(EMlogo);
};


//Gives the user a menu to choose an option from
const startMenu = () => {
 return inquirer.prompt({
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
        "Click to remove a role",
        "Click to remove a department",
        "Click to view total company wage",
        "Click to view all employees by manager",
        "Click to update an employees role",
        "Click to modify an employees manager",
        "Click to finish",
      ],
    
    }).then((answers) => {
        console.log(answers); 
    
    switch (answers.takeAction){
    //All viewing cases here
        case `Click to view all current employees`:
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
            return;
            default:
            break;
                
    };
    
});
 
}
function menuViewEmployees(employee){
  var queryallEmp = "SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, employee.manager_id FROM employee;";
  var query = Sequelize.query(queryallEmp, function (error, rows) {
      if (error) {
          console.log(error);
      } else {
          let employee = rows;
          console.table("\n");
          console.table(employee)
          
      }
      startMenu();
  })
}


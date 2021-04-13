//*Declares the npm packages required for the scripts to work
const logo = require('asciiart-logo');
const inquirer = require('inquirer');
const mysql = require('mysql');
const userPrompt = require('./config/userPrompt');

//Calling all Constructor Classes here
const deparments = require('./js_constructors/construct_departments');
const employees = require ('./js_constructors/construct_employees');
const roles = require('./js_constructors/construct_roles');

//Defining all arrays needed later on
let managerArray = [];
let roleArray = [];
let departmentArray = [];
let employeesIDArray = [];
let employeesFirstNameArray = [];
let managerIDArray = [];
let rolesIDArray = [];


//Sequelize Connection information
const express = require ('express');
const sequelize = require('./config/connection.js');
const app = express();
console.log(sequelize);

//Declaring variable for ORM part
const orm = require("./config/objectRM.js");
//const query = require("./lib/querySQL");
//console.log(query);

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

    sequelize.sync({force: false}).then(() => {
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
 });

//* This starts the entire mysql command line app
function startMenu() {
    buildManagersArray();
    buildRolesArray();
    buildDepartmentsArray();
    buildEmployeesIDArray();
    buildEmployeesFirstNameArray();
    buildManagersIDArray();
    buildRolesIDArray();

}

    //}).then((answers) => {
  switch (answers.takeAction){
//All viewing cases here
       case `Click to view all current employees`:
              menuViewEmployees();
             console.log(`${answers.takeAction}`)//;
           break;
       case `Click to view all departments`:
                menuViewDepartments();
            console.log(`${answers.takeAction}`);
         break;
      case `Click to view all roles`:
        menuViewRoles();
            console.log(`${answers.takeAction}`);
           break;
        case `Click to view all employees by manager`:
                menuViewByManager();
              console.log(`${answers.takeAction}`);
           break;
//All creating records here
      case `Click to add a new employee`:
            menuCreateEmployee();
           console.log(`${answers.takeAction}`);
            break;
      case `Click to add a new department`:
                menuCreateDepartment();
               console.log(`${answers.takeAction}`);
            break;
        case `Click to add a new role`:
                menuCreateRole();
               console.log(`${answers.takeAction}`);
            break;
    //All modifications to records are met here
        case `Click to modify an employees manager`:
           menuModifyEmployeeManager();
           console.log(`${answers.takeAction}`);
            break;
        case `Click to update an employees role`:
            menuUpdateEmployeeRole();
           console.log(`${answers.takeAction}`);
            break;
    //All deletions to records in database here
        case `Click to remove an employee`:
            menuDeleteEmployee();
            console.log(`${answers.takeAction}`);
          break;
        case `Click to remove a role`:
               menuDeleteRole();
                console.log(`${answers.takeAction}`);
           break;
      case `Click to remove a department`:
                   menuDeleteDepartment();
                    console.log(`${answers.takeAction}`);
           break;
        case `Finish`:
           orm.endConnection();
           console.log(orm.endConnection());
            return;
            default:
            break;
};


// view all employees in the database
 const menuViewEmployees =async () => {
  const query = `SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, departments.name
     FROM employee
      INNER JOIN roles on roles.id = employees.role_id
      INNER JOIN departments on departments.id = roles.deparments_id;`
  
      const employeeTable = new querySQL(query);
      employeeTable.standard_tableQuery(startMenu);
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

// add an employee to the database
function menuCreateEmployee() {
  sequelize.query('SELECT * FROM roles', function (error, result) {
     if (error) throw error;
      inquirer.prompt([
            {
                name: 'first_name',
                type: 'input', 
                  message: "What is the employee's first name? ",
              },
              {
                 name: 'last_name',
                type: 'input', 
                 message: "What is the employee's last name? "
             },
             {
                 name: 'manager_id',
                 type: 'input', 
                 message: "What is the employee's manager's ID? "
             },
             {
                 name: 'role', 
                 type: 'list',
                choices: function() {
                 var roleArray = [];
                 for (let i = 0; i < result.length; i++) {
                      roleArray.push(result[i].title);
                  }
                 return roleArray;
                },
                 message: "What is this employee's role? "
              }
             ]).then(function (answer) {
                 let roles_id;
              for (let j = 0; j < result.length; j++) {
                   if (result[a].title == answer.roles) {
                         roles_id = result[j].id;
                       console.log(roles_id)
                    }                  
                 }  
                 sequelize.query(
               'INSERT INTO employees SET ?',
                 {
                     first_name: answer.first_name,
                      last_name: answer.last_name,
                      manager_id: answer.manager_id,
                      roles_id: roles_id,
                  },
                  function (error) {
                      if (error) throw error;
                      console.log('Your employee has been added!');
                      options();
                  })
              })
          })
};
// Add a department to the database
function menuCreateDepartment() {
  inquirer.prompt([
         {
              name: 'newDepartment', 
              type: 'input', 
              message: 'Which department would you like to add?'
          }
          ]).then(function (answer) {
              sequelize.query(
                  'INSERT INTO department SET ?',
                  {
                      name: answer.newDepartment
                  });
              var query = 'SELECT * FROM departments';
              sequelize.query(query, function(error, result) {
             if(error)throw error;
              console.log('Your department has been added!');
              console.table('All Departments:', result);
              options();
              })
          })
};
// Add a role to the database
function menuCreateRole() {
  sequelize.query('SELECT * FROM departments', function(error, result) {
    if (error) throw error;
    inquirer.prompt([
         {
              name: 'new_role',
              type: 'input', 
              message: "What new role would you like to add?"
          },
          {
              name: 'salary',
              type: 'input',
              message: 'What is the salary of this role? (Enter a number)'
          },
          {
              name: 'department',
              type: 'list',
              choices: function() {
              var deptArray = [];
                  for (let i = 0; i < result.length; i++) {
                 deptArray.push(result[i].name);
                 }
                  return deptArray;
              },
          }
      ]).then(function (answer) {
         let departments_id;
          for (let a = 0; a < result.length; a++) {
              if (result[a].name == answer.departments) {
                 departments_id = result[a].id;
              }
          }
  
          sequelize.query(
              'INSERT INTO roles SET ?',
              {
                 title: answer.new_roles,
                  salary: answer.salary,
                  departments_id: departments_id
              },
              function (error, result) {
                  if(error)throw error;
                  console.log('Your new role has been added!');
                  console.table('All Roles:', result);
                  options();
              })
      })
  })
};

// update a role in the database
//function updateRole() {

//};

//  delete an employee
//function  menuDeleteEmployee() {

//};
//View by manger
//function menuViewByManager(){};

}

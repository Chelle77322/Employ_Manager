//Declares the npm packages required for the scripts to work
const logo = require('asciiart-logo');
const mysql = require('mysql');
const {prompt}= require ('inquirer');
const db = ('./db');
const table = require('table');
const typeInquire = ['input', 'confirm', 'list']

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
  const choices = require('./lib/choices');
  const userPrompt = require ('./lib/userPrompt');
init();
  //Loads the ascii logo 
  function init() {
   
    const EMlogo = logo ({ name: "Employment Manager",logoColor: 'magenta', borderColor: 'magenta', textColor: 'magenta' }).render();
  
    console.log(EMlogo);
  
  }
  
const startInquirer = require('./lib/inquirer');
const inquirer = require('inquirer');
const querySQL = require('./lib/querySQL');

mainMenu();
 function mainMenu (){
   const menuChoices = new startInquirer(typeInquire[2],'selectChoice', userPrompt.choiceMenuPrompt, choices);

   inquirer.prompt([menuChoices.ask()]).then(operation =>{
  //Start of queries to bring all the information from each table: department, employees and role

  const departmentQuery = "SELECT department.name FROM department"
  const departArrayQuery = new querySQL(departmentQuery);

  const roleQuery = "SELECT role.title FROM role"
  const roleArrayQuery = new querySQL(roleQuery);

 switch (operation.menuChoices) {

  case menuChoices[2]:
      //Will return all the employees
      //return viewAllEmp();
      return allEmployees();

  case menuChoices[3]:
      //This is the case where a user can view all the employees in a given department
      //queryReturnResult() is a method in my SQLqueries class that will run a query and return the result
      // to the function delivered as the parameter
      departArrayQuery.queryReturnResult(result);
      break;

  case menuChoices[4]:
      //Employees under Manager
   console.log("This will return all employees under their manager");
break;
  case menuChoices[5]:
      //shows employees by their role
      roleArrayQuery.getQueryNoRepeats(reuslt)
      break;

  case menuChoices[6]:
      //This is the case where user can view all the managers and the departments they are in
      //return viewAllManager();
      console.log("managers will be here");
      break;

  case menuChoices[7]:
      //This is the case for adding an employee
     console.log("Add a department here");

      break;

  case menuChoices[8]:
      //This is the case for deleting an employee
      console.log('remove a department here');
      break;

  case menuChoices[9]:
      //This is the case for the update an employees role funtion
      console.log("Add a employee role here");

      break;

  case menuChoices[10]:
      //This is the case for updating an employees manager
     console.log("remove an employee role");
     break;

  case menuChoices[11]:
      //Adds employee
      console.log("Adds employee");
     break;
  case menuChoices[12]:
      //This is the case for removing employee from database.
     console.log("Removes an employee" )

  case menuChoices[13]:
      //updating employee role.
     console.log("updating employee role");
      break;
  // return removeRole();

  case menuChoices[0]:
      //This is the case for viewing all the departments by name in the company
     console.log("Time to view all departments");

  case menuChoices[1]:
      //View all departments
      console.log("View all departments here");
      break;

  case menuChoices[14]:
      //this is the case where user can delete a department from database
      console.log("Updates the employee manager");
      break;
}

//This calls all the employees in database
function allEmployees() {
  const query = `SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name
                   FROM employee
                   INNER JOIN role on role.id = employee.role_id
                   INNER JOIN department on department.id = role.department_id;`

  const employeeTable = new querySQL(query);
  //this line runs the generalTableQuery() method on the sqlquery instance declared by empTable variable.
  //Mainmenu is delivered as a parameter because it is the function that is essentially used to take user to the next step.
  employeeTable.standard_tableQuery(mainMenu);
}


});
  
}
  
    


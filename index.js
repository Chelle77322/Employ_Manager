//*Declares the npm packages required for the scripts to work
const logo = require('asciiart-logo');
const {prompt} = require('inquirer');

const mysql = require('mysql');
const userPrompt = require('./config/userPrompt');

//Calling all Constructor Classes here
const departments = require('./js_constructors/construct_departments');
const employees = require ('./js_constructors/construct_employees');
const roles = require('./js_constructors/construct_roles');

//Defining all arrays needed later on
//let managerArray = [];
//let roleArray = [];
//let departmentArray = [];
//let employeesIDArray = [];
//let employeesFirstNameArray = [];
//let managerIDArray = [];
//let rolesIDArray = [];


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
async function startMenu() {
  const { choice } = await prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        {
          name: "View All Employees",
          value: "VIEW_EMPLOYEES"
        },
        {
          name: "View All Employees By Department",
          value: "VIEW_EMPLOYEES_BY_DEPARTMENT"
        },
        {
          name: "View All Employees By Manager",
          value: "VIEW_EMPLOYEES_BY_MANAGER"
        },
        {
          name: "Add Employee",
          value: "ADD_EMPLOYEE"
        },
        {
          name: "Remove Employee",
          value: "REMOVE_EMPLOYEE"
        },
        {
          name: "Update Employee Role",
          value: "UPDATE_EMPLOYEE_ROLE"
        },
        {
          name: "Update Employee Manager",
          value: "UPDATE_EMPLOYEE_MANAGER"
        },
        {
          name: "View All Roles",
          value: "VIEW_ROLES"
        },
        {
          name: "Add Role",
          value: "ADD_ROLE"
        },
        {
          name: "Remove Role",
          value: "REMOVE_ROLE"
        },
        {
          name: "View All Departments",
          value: "VIEW_DEPARTMENTS"
        },
        {
          name: "Add Department",
          value: "ADD_DEPARTMENT"
        },
        {
          name: "Remove Department",
          value: "REMOVE_DEPARTMENT"
        },
        {
          name: "Quit",
          value: "QUIT"
        }
      ]
    }
  ]);

  // Call the appropriate function depending on what the user chose
  switch (choice) {
    case "VIEW_EMPLOYEES":
      return viewEmployees();
    case "VIEW_EMPLOYEES_BY_DEPARTMENT":
      return viewEmployeesByDepartment();
    case "VIEW_EMPLOYEES_BY_MANAGER":
      return viewEmployeesByManager();
    case "ADD_EMPLOYEE":
      return addEmployee();
    case "REMOVE_EMPLOYEE":
      return removeEmployee();
    case "UPDATE_EMPLOYEE_ROLE":
      return updateEmployeeRole();
    case "UPDATE_EMPLOYEE_MANAGER":
      return updateEmployeeManager();
    case "VIEW_DEPARTMENTS":
      return viewDepartments();
    case "ADD_DEPARTMENT":
      return addDepartment();
    case "REMOVE_DEPARTMENT":
      return removeDepartment();
    case "VIEW_ROLES":
      return viewRoles();
    case "ADD_ROLE":
      return addRole();
    case "REMOVE_ROLE":
      return removeRole();
    default:
      return quit();
  }
}

async function viewEmployees() {
  const employees = await mysql.findAllEmployees();

  console.log("\n");
  console.table(employees);

  startMenu();
}

async function viewEmployeesByDepartment() {
  const departments = await mysql.findAllDepartments();

  const departmentChoices = departments.map(({ id, name }) => ({
    name: name,
    value: id
  }));

  const { departments_id } = await prompt([
    {
      type: "list",
      name: "department_id",
      message: "Which department would you like to see employees for?",
      choices: departmentChoices
    }
  ]);

  const employees = await db.findAllEmployeesByDepartment(departments_id);

  console.log("\n");
  console.table(employees);

  startMenu();
}

async function viewEmployeesByManager() {
  const managers = await mysql.findAllEmployees();

  const managerChoices = managers.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));

  const { manager_id } = await prompt([
    {
      type: "list",
      name: "manager_id",
      message: "Which employee do you want to see direct reports for?",
      choices: managerChoices
    }
  ]);

  const employees = await mysql.findAllEmployeesByManager(manager_id);

  console.log("\n");

  if (employees.length === 0) {
    console.log("The selected employee has no direct reports");
  } else {
    console.table(employees);
  }

  startMenu();
}

async function removeEmployee() {
  const employees = await mysql.findAllEmployees();

  const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));

  const { employees_id } = await prompt([
    {
      type: "list",
      name: "employees_id",
      message: "Which employee do you want to remove?",
      choices: employeeChoices
    }
  ]);

  await db.removeEmployee(employees_id);

  console.log("Removed employee from the database");

  startMenu();
}

async function updateEmployeeRole() {
  const employees = await mysql.findAllEmployees();

  const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));

  const { employees_id } = await prompt([
    {
      type: "list",
      name: "employees_id",
      message: "Which employee's role do you want to update?",
      choices: employeeChoices
    }
  ]);

  const roles = await mysql.findAllRoles();

  const roleChoices = roles.map(({ id, title }) => ({
    name: title,
    value: id
  }));

  const { roles_id } = await prompt([
    {
      type: "list",
      name: "roles_id",
      message: "Which role do you want to assign the selected employee?",
      choices: roleChoices
    }
  ]);

  await mysql.updateEmployeeRole(employees_id, roles_id);

  console.log("Updated employee's role");

  startMenu();
}

async function updateEmployeeManager() {
  const employees = await mysql.findAllEmployees();

  const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));

  const { employees_id } = await prompt([
    {
      type: "list",
      name: "employees_id",
      message: "Which employee's manager do you want to update?",
      choices: employeeChoices
    }
  ]);

  const managers = await mysql.findAllPossibleManagers(employees_id);

  const managerChoices = managers.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));

  const { manager_id } = await prompt([
    {
      type: "list",
      name: "manager_id",
      message:
        "Which employee do you want to set as manager for the selected employee?",
      choices: managerChoices
    }
  ]);

  await db.updateEmployeeManager(employee_id, manager_id);

  console.log("Updated employee's manager");

  startMenu();
}

async function viewRoles() {
  const roles = await db.findAllRoles();

  console.log("\n");
  console.table(roles);

  startMenu();
}

async function addRole() {
  const departments = await mysql.findAllDepartments();

  const departmentChoices = departments.map(({ id, name }) => ({
    name: name,
    value: id
  }));

  const roles = await prompt([
    {
      name: "title",
      message: "What is the name of the role?"
    },
    {
      name: "salary",
      message: "What is the salary of the role?"
    },
    {
      type: "list",
      name: "departments_id",
      message: "Which department does the role belong to?",
      choices: departmentChoices
    }
  ]);

  await mysql.createRole(roles);

  console.log(`Added ${roles.title} to the database`);

  startMenu();
}

async function removeRole() {
  const roles = await mysql.findAllRoles();

  const roleChoices = roles.map(({ id, title }) => ({
    name: title,
    value: id
  }));

  const { roles_id } = await prompt([
    {
      type: "list",
      name: "roles_id",
      message:
        "Which role do you want to remove? (Warning: This will also remove employees)",
      choices: roleChoices
    }
  ]);

  await mysql.removeRole(roles_id);

  console.log("Removed role from the database");

  startMenu();
}

async function viewDepartments() {
  const departments = await mysql.findAllDepartments();

  console.log("\n");
  console.table(departments);

  startMenu();
}

async function addDepartment() {
  const departments = await prompt([
    {
      name: "name",
      message: "What is the name of the department?"
    }
  ]);

  await mysql.createDepartment(departments);

  console.log(`Added ${departments.name} to the database`);

  startMenu();
}

async function removeDepartment() {
  const departments = await mysql.findAllDepartments();

  const departmentChoices = departments.map(({ id, name }) => ({
    name: name,
    value: id
  }));

  const { departments_id } = await prompt({
    type: "list",
    name: "departments_id",
    message:
      "Which department would you like to remove? (Warning: This will also remove associated roles and employees)",
    choices: departmentChoices
  });

  await mysql.removeDepartment(departments_id);

  console.log(`Removed department from the database`);

startMenu();
}

async function addEmployee() {
  const roles = await mysql.findAllRoles();
  const employees = await mysql.findAllEmployees();

  employees = await prompt([
    {
      name: "first_name",
      message: "What is the employee's first name?"
    },
    {
      name: "last_name",
      message: "What is the employee's last name?"
    }
  ]);

  const roleChoices = roles.map(({ id, title }) => ({
    name: title,
    value: id
  }));

  const { roles_id } = await prompt({
    type: "list",
    name: "roles_id",
    message: "What is the employee's role?",
    choices: roleChoices
  });

  employees.roles_id = roles_id;

  const managerChoices = employees.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));
  managerChoices.unshift({ name: "None", value: null });

  const { manager_id } = await prompt({
    type: "list",
    name: "manager_id",
    message: "Who is the employee's manager?",
    choices: managerChoices
  });

  employees.manager_id = manager_id;

  await mysql.createEmployee(employees);

  console.log(
    `Added ${employees.first_name} ${employees.last_name} to the database`
  );

  startMenu();
}

function quit() {
  console.log("Goodbye!");
  process.exit();
}
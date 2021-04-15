//*Declares the npm packages required for the scripts to work
const logo = require('asciiart-logo');
//const {prompt} = require('inquirer');
const mysql = require('mysql');

//Declaring variable for ORM part
const orm = require("./config/objectRM.js");
const userPrompt = require('./config/userPrompt');

//Calling all Constructor Classes here
const departments = require('./js_constructors/construct_departments');
const employees = require ('./js_constructors/construct_employees');
const roles = require('./js_constructors/construct_roles');

//Sequelize Connection information
const express = require ('express');
const sequelize = require('./config/connection.js');
const app = express();
console.log(sequelize);

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
const startMenu = async () => {
  const mainMenuChoice = await userPrompt.startMenu();

  // Call the appropriate function depending on what the user chose
  switch (mainMenuChoice) {
    case "viewEmployees":
       viewEmployees();
       break;
    case "viewEmployeesByDepartment":
      viewEmployeesByDepartment();
      break;
    case "viewEmployeesByManager":
      viewEmployeesByManager();
      break;
    case "addEmployee":
      addEmployee();
      break;
    case "removeEmployee":
      removeEmployee();
      break ;
    case "updateEmployeeRole":
       updateEmployeeRole();
       break;
    case "updateEmployeeManager":
      updateEmployeeManager();
      break;
    case "viewDepartments":
      viewDepartments();
      break;
    case "addDepartments":
      addDepartments();
      break;
    case "removeDepartment":
       removeDepartment();
       break;
    case "viewRoles":
      viewRoles();
      break;
    case "addRole":
      addRole();
      break;
    case "removeRole":
      removeRole();
      break;
      case `Exit`:
        orm.endConnection();
        return;
      default:
        break;
     
  }
}
// Shows the entire salary budget for a department - may not work correctly
const viewDepartments = async () => {
const departments_id = await userPrompt.confirmedChoice();
const departmentViewData = await orm.selectWhereAsync(
  `*`,
  `departments`,
  `id`,
  departments_id,
  `id`
);
//Are we actually getting anything here
if(departmentViewData.length === 0){
  console.log(`No ID was found in the actual database`);
  const departmentRetry = await userPrompt.confirmedChoice();
  if (!departmentRetry){
    return startMenu();
  }else {
    return menuView();
  } 
}
const departmentBudgetData = await orm.selectDepartmentBudget(departments_id);
console.table(departmentBudgetData);
console.log(`###*****######*******######*****`);

startMenu();
};
//Show all delete options for the user
const menuDelete = async (table) => {
  let tableName;
//Uses the if statement to bring up choices 
if (typeof table === "undefined"){
  const menuDelete = await userPrompt.menuDelete();
  switch(menuDelete){
    case `Delete an Employee`:
      tableName = `employees`;
      break;
    case `Delete a Work Role`:
      tableName = `roles`;
      break;
      case `Delete a Work Department`:
        tableName = `departments`;
        break;
  }
} else {
  tableName = notable;
}
const delete_id = await userPrompt.confirmedChoice(`${tableName}`);
const deleteViewData = await orm.selectWhereAsync(
  `*`,
  tableName,
  `id`,
  delete_id,
  `id`
);
//Validation Check
if(deleteViewData.length === 0){
  console.log("ID not found for deletion purposes");
  const retryDelete = await userPrompt.confirmedChoice();
cofirmsChoice
  if (!retryDelete){
return startMenu();
  } else {
    return menuDelete(tableName);
  }
}
//Double checking that you are deleting the correct record
console.table(deleteViewData);
console.log("You are about to delete the above table");
const confirmDelete = await userPrompt.confirmedChoice();
if (confirmDelete){
  const deleteQuery = await orm.deleteAsync(tableName, delete_id);
  console.log(deleteQuery.affectedRows !==0
    ? `You have been successful in deleting the record`
    : `Failed to delete record`);
} else {
  console.log(`Your changes have been rejected`);
}
console.log(`####******#####*********#####`);
startMenu();
};
//This section modifies the data already in the tables 
const menuModify = async (table) => {
  let tableName;
  if (typeof table === "undefined"){
    const menuModifyChoice = await userPrompt.menuModify();
    switch(menuModifyChoice){
      case `Modify an existing Employee`:
        tableName = `employees`;
        break;
        case `Modify an existing Role`:
        tableName = `roles`;
        break;
        case `Modify an existing Department`:
        tableName = `departments`;
        break;
    }
  } else {
    tableName = notable;
  }
  const tableColInfo = await orm.getColumnAsync(tableName);
  const modify_id = await userPrompt.confirmedChoice(`${tableName}`);
  const modifyViewData = await orm.selectWhereAsync(
    `*`,
    tableName,
    `id`,
    modify_id,
    `id`
  );
//Another validation check
if (modifyViewData.length === 0 ){
  console.log(`Could not find the ID in the database`);
  const retryModify = await userPrompt.confirmChoice();
  if (!retryModify){
    return startMenu();
  } else {
    return menuModify(tableName);
  }
}
console.table(modifyViewData);
const modifyViewArray = [];
tableColInfo.forEach((element) => {
  if (element.Extra !== 'auto_increment'){
    modifyViewArray.push(element.field);
  }
  });
  console.log("Please select the field you want to modify");
  const colModify = await userPrompt.arrayChoice(modifyViewArray);
  let FKvalue;
  for (p = 0; p < tableColInfo.length; p++){
    if(tableColInfo[p].field === colModify){
      if(tableColInfo[p].key === "NULL"){
        const dataFK = await orm.getFKAsync(tableName, colModify);
        FKvalue = await orm.selectAsync(
          dataFK[0].REFERENCED_COLUMN_NAME,
          dataFK[0].REFERENCED_TABLE_NAME,
          "id"
        );
      }
      const modifyValue = await userPrompt.columnChoice(colModify,
        tableColInfo[p].type,
        tableColInfo[p].null,
        FKvalue);
        console.log(`${tableColInfo[p].field} is going to change to ${modifyValue} are you sure`);
        const modifyConfirm = await userPrompt.confirmedChoice();
        if (modifyConfirm){
          const modifyQuery = await orm.updateEmpAsync(
            tableName, modifyCol, modifyValue, modify_id
          );

        } else {
          console.log(`Your changes have been discarded`);
        }
    console.log(`^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^`);  
    }
  }
  startMenu();
};

//Section to view everything here
const menuView = async() => {
  const menuViewChoice = await userPrompt.menuView();
  let dataView;
  let tableName;
  switch(menuViewChoice){
    case `View Employees`:
    dataView = await orm.selectAsync("*", "employees", "id");
    tableName = `employees`;
    break;
    case `View Roles`:
    dataView = await orm.selectAsync("*", "roles", "id");
    tableName = `roles`;
    break;
    case `View Departments`:
    dataView = await orm.selectAsync("*", "departments", "id");
    tableName = `departments`;
    break;
  }
  //Here the filter will apply
  const menuFilter = await userPrompt.filterChoice();
  switch(menuFilter){
    case`View All`:
    console.table(dataView);
  break;
  case `Filtered View`:
    console.log(`What filters do you want to apply \n`);
  const colView = await userPrompt.arrayChoice(Object.keys(dataView[0]));
  const viewValue = await userPrompt.confirmedChoice(colView);
  const filterViewData = await orm.selectWhereAsync(
    "*",
    tableName,
    colView,
    viewValue,
    `id`
  );
  switch(filterViewData.length){
    case 0:
      console.log(`No records matched the entered critera \n`);
    break;
    default:
      console.table(filterViewData);
      break;
  }
break;
  }
  startMenu();
};

//Section for creating new records in database
const menuCreate = async () => {
  const menuChoice = await userPrompt.menuCreate();
  let tableName;
  switch(menuChoice){
    case `Create an Employee`:
      tableName = `employees`;
      break;
    case `Create a Role`:
      tableName = `roles`;
      break;
    case `Create a Department`:
      tableName = `departments`;
      break;
  }
  const tableColInfo = await orm.getColumnAsync(tableName);
  const columnCreate = [];
  const valueCreates = [];
  for(p = 0; p <tableColInfo.length; p++){
    if(tableColInfo[p].extra != "auto_increment"){
      let valueFK;
      if(tableColInfo[p].key === "MUL"){
        const dataFK = await orm.getFKAsync(tableName, tableColInfo[p].field);
        valueFK = await orm.selectAsync(
          dataFK[0].REFERENCED_COLUMN_NAME,
          dataFK[0].REFERENCED_TABLE_NAME,
          "id"
        );
      }
      const valueCreate = await userPrompt.columnChoice(
        tableColInfo[p].field,
        tableColInfo[p].type,
        tableColInfo[p].null,
        valueFK
      );
      if(valueCreate !== ""){
        valueCreates.push(valueCreate);
        columnCreate.push(tableColInfo[p].field);
      }
    }
  }
 //Create a record in the database
 const queryCreate = await orm.createAsync(tableName, columnCreate, [valueCreates,]);
 console.log( queryCreate.affectedRows !== 0
  ?`Record has been created`
  : `Failed to create record`);
  menuCreate();
};
startMenu();

//might use this later
async function viewEmployees() {
 const employees = await userPrompt.findAllEmployees();
//
 console.log("\n");
  console.table(employees);
  startMenu();
}
async function viewEmployeesByDepartments() {
  const departments = await userPrompt.findAllDepartments();
  const departmentChoices = departments.map(({ id, name }) => ({
   name: name,
   value: id
 }));
 const {departments_id } = await prompt([
   {
      type: "list",
      name: "departments_id",
   message: "Which department would you like to see employees for?",
    choices: departmentChoices
  }
 ]);
const employees = await userPrompt.findAllEmployeesByDepartments(departments_id);
console.log("\n");
console.table(employees);
startMenu();
}
async function viewEmployeesByManager() {
const managers = await userPrompt.findAllEmployees();
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
const employees = await userPrompt.findAllEmployeesByManager(manager_id);
console.log("\n");
  if (employees.length === 0) {
    console.log("The selected employee has no direct reports");
  } else {
    console.table(employees);
  }
startMenu();
}
async function removeEmployee() {
  const employees = await userPrompt.findAllEmployees();
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
  await prompt.removeEmployee(employees_id);
console.log("Removed employee from the database");
  startMenu();
}
async function updateEmployeeRole() {
  const employees = await userPrompt.findAllEmployees();
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
  const roles = await userPrompt.findAllRoles();
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
  const employees = await userPrompt.findAllEmployees();
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
const managers = await userPrompt.findAllPossibleManagers(employees_id);
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
await userPrompt.updateEmployeeManager(employee_id, manager_id);
console.log("Updated employee's manager");
startMenu();
}async function viewRoles() {
const roles = await userPrompt.findAllRoles();
console.log("\n");
  console.table(roles);
startMenu();
}
async function addRole() {
  const departments = await userPrompt.findAllDepartments();
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
}async function removeRole() {
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
await userPrompt.removeRole(roles_id);
console.log("Removed role from the database");
startMenu();
}
//viewDepartments() 
//const departments = await userPrompt.findAllDepartments();
 //console.log("\n");
  //console.table(departments);
  //startMenu();

async function addDepartment() {
  const departments = await prompt([
    {
      name: "name",
      message: "What is the name of the department?"
    }
  ]);

 await userPrompt.createDepartment(departments);
  console.log(`Added ${departments.name} to the database`);
  startMenu();
}
async function removeDepartment() {
  const departments = await userPrompt.findAllDepartments();
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
  await userPrompt.removeDepartment(departments_id)//;
  console.log(`Removed department from the database`);
startMenu();
}
async function addEmployee() {
  const roles = await userPrompt.findAllRoles();
  const employees = await userPrompt.findAllEmployees();
  employees = await userPrompt([
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
  await userPrompt.createEmployee(employees);
  console.log(
    `Added ${employees.first_name} ${employees.last_name} to the database`
  );
  startMenu();
  }
function quit() {
  console.log("Goodbye!");
  process.exit();
}
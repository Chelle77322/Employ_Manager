//Declares the npm packages required for the scripts to work
const logo = require('asciiart-logo');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const path = require("path");
const sequelize = require("sequelize");

//Declaring variable for ORM part
const orm = require("./config/objectRM.js");
const promptUser = require("./config/userPrompt.js");
const table = require('console.table');
const start = require('./lib/inquirer.js');

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
const querySQL = require('./lib/querySQL.js');



startMenu();
function startMenu() {

    //This is calling the class Inquirer functions to create an instance of the class
    const menuPrompt = new startInquirer(typeInquire[2], 'Make your choice', userPrompt.choiceMenuPrompt,choices);
    
    //Shows menu choices
    inquirer.prompt([menuChoices.ask()]).then(operation => {
//Returns roles
 const roleQuery = "SELECT roles.title FROM roles"
const roleQueryArray = new querySQL(roleQuery);

const departmentQuery = "SELECT departments.name FROM departments";
 const departmentQueryArray = new querySQL(departmentQuery);

switch (operation.menuChoices) {

case menuChoices [2]:
     //Returns all employees
                    return allEmployees();

case menuChoices[3]:
               //View employees by department
                    deparmentQueryArray.queryReturnResult(allEmployDepartment);
                    break;

                case menuChoices[4]:
                 //Employees by manager
                    const actionChoice5 = "VIEW BY MANAGER"
                    // return allEmployManager
                    dummyArr = [];
                    //Employee Info
                    promptEmployInfo(dummyArr, actionChoice5);
                    break;

                case menuChoices[5]:
                 //View employees by role title
                    compRolesArrayQuery.getQueryNoRepeats(viewAllEmpRole)
                    break;

                case commandMenuChoices[6]:
               //Show managers in their departments
                    return showAllManagers();

                case menuChoices[11]:
                 //Adding an employee
                    const actionChoice1 = "ADD"
                    compRolesArrayQuery.getQueryNoRepeats(promptEmployInfo, actionChoice1);

                    break;

                case menuChoices[12]:
                 //Delete Employee
                    const actionChoice2 = "DELETE"
                    compRolesArrayQuery.getQueryNoRepeats(promptEmployInfo, actionChoice2);
                    break;

                case menuChoices[13]:
                  //Updating Employee Role
                    const actionChoice3 = "UPDATE EMP ROLE"
                    compRolesArrayQuery.getQueryNoRepeats(promptEmployInfo, actionChoice3);

                    break;

             case menuChoices[14]:
                 //Updating Manager
                    const actionChoice4 = "UPDATE EMP MANAGER";
                    compRolesArrayQuery.getQueryNoRepeats(promptEmployInfo, actionChoice4);
                    break;

                case menuChoices[1]:
                //View All roles
                    return allRoles();

                case menuChoices[9]:
                 //Add a role
                    return addRole();

                case menuChoices[10]:
                 //Delete Role
                    const actionChoice7 = "DELETE ROLE";
                    compRolesArrayQuery.getQueryNoRepeats(deleteRole, actionChoice7);
                    break;
                // return removeRole();

                case menuChoices[0]:
                 //View All Departments
                    return allDepartments();

                case menuChoices[7]:
                 //Add Department
                    depNamesArrayQuery.queryReturnResult(addDep);
                    break;

                case menuChoices[8]:
                //Remove Department
                    depNamesArrayQuery.queryReturnResult(removeDep);
                    break;
            }
        })
}
//This function will display a table with all the employees in the database on the console
function allEmployees() {
    const query = `SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, departments.name
    FROM employees INNER JOIN roles on roles.id = employees.roles_id
    INNER JOIN departments on departments.id = roles.departments_id;`

    const empTable = new querySQL(query);
//Runs standard table query and shows start Menu to allow user to make selection
    empTable.standard_tableQuery(startMenu);
}

//Shows all employees by departments
function allEmployDepartment(departmentNameArray) {
const promptDepartmentName = new startInquirer(typeInquire[2], 'departments_name', questions.allEmployDepartment, departmentNameArray);
    inquirer.prompt(promptDepartmentName.ask()).then(userResponse => {

const query = `SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, departments.name
FROM employees
INNER JOIN roles on roles.id = employees.roles_id
INNER JOIN departments on departments.id = roles.departments_id AND departments.name = ? ;`

const empByDepTable = new querySQL(query, userResponse.departments_name);
//Shows employees by department
        empByDepTable.standard_tableQuery(startMenu);
    })
}
//Sorts employees by manager
function allEmployManager(managerObj, namesArr) {
    
const chosenManager = new startInquirer (typeInquire[2], 'manager_choice', questions.searchByManager, namesArr);

inquirer.prompt([chosenManager.ask()]).then(userChoice => {

        console.log(`Manager Searched By: ${userChoice.manager_choice}`);

        let chosenManagerID = 0;
        //This line grabs the chosen manager and gets the first name
        const chosenManagerName = userChoice.manager_choice.split(" ", 2)

//Finds managers based on last name
        for (manager of managerObj) {
            if (chosenManagerName[1] == manager.lastName) {
                chosenManagerID = manager.ID;
            }
        }

        const queryManagerSearch = `SELECT employees.last_name, employees.first_name, roles.title, departments.name
         FROM employees
         INNER JOIN roles on roles.id = employees.roles_id
        INNER JOIN departments on departments.id = roles.departments_id
        WHERE employees.manager_id = (?) `

//Returns all managers
        const managerSearch = new querySQL(queryManagerSearch, chosenManagerID);
        managerSearch.standard_tableQuery(startMenu);
    })
}
//Generates all employees based on a role
function viewAllEmpRole(compRoles, actionChoice) {
//Create an instance of startInquirer and then deliver it a prompt for inquirer.
    const rolePrompt = new startInquirer(typeInquire[2], 'roles_title', questions.viewAllEmpByRole, compRoles);
    inquirer.prompt(rolePrompt.ask()).then(userResponse => {

//Joins role and department so you can view employee by roles
        const query = `SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, departments.name
                        FROM employees 
                        INNER JOIN roles on roles.id = employees.roles_id AND roles.title = (?)
                        INNER JOIN departments on departments.id = roles.departments_id;`;


        const empByRoleTable = new querySQL(query, userResponse.role_Title);
        empByRoleTable.standard_tableQuery(startMenu);
    })
}

function showAllManagers() {
const query = `SELECT employees.id, employees.first_name, employees.last_name, departments.name
FROM employees INNER JOIN roles on roles.id = employees.roles_id
INNER JOIN departments on departments.id = roles.departments_id
WHERE employees.id IN ( SELECT employees.manager_id FROM employees );`;
//Returns a filtered result
const managerTable = new querySQL(query);
managerTable.standard_tableQuery(startMenu);
}
//Function allows user to add or delete employment information
function promptEmployInfo(compRoles, actionChoice) {
//Returns Employee table
    const query = "SELECT id, first_name, last_name FROM employees WHERE employees.id IN ( SELECT employees.manager_id FROM employees )";

    connection.query(query, function (error, result) {
        if (error) throw error
        
        let managerNamesArr = [];
        let managerObjArr = [];

//Manager name array
        for (let i = 0; i < result.length; i++) {
            let name = result[i].first_name + " " + result[i].last_name;
            let managersobj = {
                ID: result[i].id,
                firstName: result[i].first_name,
                lastName: result[i].last_name
            }

            managerObjArr.push(managersobj);
            managerNamesArr.push(name);
        }
//Create four instances of startInquirer function to add an employee
        const first_name = new startInquirer(typeInquire[0], 'first_name', questions.addEmployee1);
        const last_name = new startInquirer(typeInquire[0], 'last_name', questions.addEmployee2);
        const emp_role = new startInquirer(typeInquire[2], 'employee_role', questions.addEmployee3, compRoles);
        const emp_manager = new startInquirer(typeInquire[2], 'employee_manager', questions.addEmployee4, managerNamesArr);

        if (actionChoice == "ADD") {

    //Promise.all is used here to grab the ask() methods 
    Promise.all([first_name.ask(), last_name.ask(), emp_role.ask(), emp_manager.ask()]).then(prompts => {
        inquirer.prompt(prompts).then(emp_info => {

//Add employ info
                    addEmp(emp_info, managerObjArr);
                })
            })
            //Execute code if the view by manager was chosen
        } else if (actionChoice == "VIEW BY MANAGER") {
            allEmployManager(managerObjArr, managerNamesArr);

        } else {

            Promise.all([first_name.ask(), last_name.ask()]).then(prompts => {
                inquirer.prompt(prompts).then(emp_info => {

//Multiple Condition Check
                    if (actionChoice == "UPDATE EMP ROLE") {
                        employeeCheck(emp_info, actionChoice, compRoles);
                    } else if (actionChoice == "UPDATE EMP MANAGER") {
                        employeeCheck(emp_info, actionChoice, managerObjArr, managerNamesArr);
                    } else {
                        employeeCheck(emp_info, actionChoice);
                    }
                })
            })
        }
    })
}
//Function to add an Employee
function addEmp(emp_info, managerObjArr) {

    console.log("You've entered employee ADD");


    const queryRoleIdFromTitle = "SELECT roles.id FROM roles WHERE roles.title = (?) ;"
    connection.query(queryRoleIdFromTitle, emp_info.employee_role, function (error, result) {
        if (error) {
            throw error;
        }
        const empRoleId = result[0].id;
        const empFirstName = emp_info.first_name;
        const empLastName = emp_info.last_name;
        const empManagerName = emp_info.employee_manager.split(" ");
        const empManagerFirstName = empManagerName[0];
        const empManagerLastName = empManagerName[1];

        let empManagerID = 0;
//Manager ID Loop
        for (let manager of managerObjArr) {
            if (manager.firstName == empManagerFirstName && manager.lastName === empManagerLastName) {
                empManagerID = manager.ID;
            }
        }

//Query to insert employee
const queryInsertEmpInfo = "INSERT INTO employees (first_name, last_name, roles_id, manager_id) VALUES (?, ?, ?, ?)"

connection.query(queryInsertEmpInfo, [empFirstName, empLastName, empRoleId, empManagerID], function (error, result) {
if (error) {
throw error
            }
console.log("Employee Added");
            startMenu();
        })
    })
}
//This function checks for multiple instances of the employee or role that is being changed
function employeeCheck(emp_info, actionChoice, arrayNeededForNextStep) {

console.log("You've entered employee multiples check")

const empFirstName = emp_info.first_name;
const empLastName = emp_info.last_name;
const queryMultipleEmpCheck = `SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, 
employees.manager_id, departments.name FROM employees 
INNER JOIN roles on roles.id = employees.roles_id INNER JOIN departments on departments.id = roles.departments_id
WHERE employees.first_name = (?) AND employees.last_name = (?);`

connection.query(queryMultipleEmpCheck, [empFirstName, empLastName], function (error, result) {
 if (result.length > 1) {
            console.log("Multiple Employees Found!")
            let multipleName = [];
            for (employees of result) {
                let empStr = `${employees.id} ${employees.first_name} ${employees.last_name} ${employees.title} ${employees.name}`
                multipleName.push(empStr);
            }
            const which_employee_to_Delete = new startInquirer(typeInquire[2], 'employees_delete', questions.deleteEmployee1, multipleName);

            inquirer.prompt([which_employee_to_Delete.ask()]).then(userChoice => {
                const chosenEmpInfo = userChoice.employee_delete.split(" ");
                const chosenEmpFirstName = chosenEmpInfo[1];
                const chosenEmpLastName = chosenEmpInfo[2];
                const chosenEmpID = chosenEmpInfo[0];
                const chosenEmpRole = chosenEmpInfo[3];

                if (actionChoice === "DELETE") {
                    deleteEmployee(chosenEmpFirstName, chosenEmpLastName, chosenEmpID);
                } else if (actionChoice === "UPDATE EMP ROLE") {
                    updateEmpRole(chosenEmpID, arrayNeededForNextStep);
                } else if (actionChoice === "UPDATE EMP MANAGER") {
                    updateEmployeeManager(chosenEmpID, arrayNeededForNextStep);
                }
            })

        } else if (result[0].id == "undefined") {
            console.log("Could not find employee. Taken back to the Start Menu")
            startMenu();

        } else {
            console.log("One Employee Found!")

            if (actionChoice === "DELETE") {
                deleteEmployee(empFirstName, empLastName, result[0].id)
            } else if (actionChoice === "UPDATE EMP ROLE") {
                updateEmpRole(result[0].id, arrayNeededForNextPart);
            } else if (actionChoice === "UPDATE EMP MANAGER") {
                updateEmployeeManager(result[0].id, arrayNeededForNextPart);
            }
        }
    })
}   

//Delete Employee
function deleteEmployee(firstName, lastName, employeeID) {
    console.log("You've entered employee delete.")

    const queryDelete = "DELETE FROM employee WHERE employee.id = (?);"
    const confirmDelete = new startInquirer(typeInquire[2], 'confirm_choice', questions.deleteEmployee2 + firstName + " " + lastName + "?", ["yes", "no"]);
    const deleteQuery = new querySQL(queryDelete, employeeID);

    inquirer.prompt([confirmDelete.ask()]).then(respObj => {
        if (respObj.confirm_choice === "yes") {
            deleteQuery.delete(startMenu);
        } else {
            startMenu();
        }
    })
}

//Update Employee role
function updateEmpRole(employeeID, RolesArray) {
    console.log("Entered update employee role.")

    const empNewRole = new startInquirer(typeInquire[2], 'employees_role', questions.updateRole, RolesArray);
    const queryGetRoleId = `SELECT roles.id
                    FROM roles
                    Where roles.title = (?);`
    inquirer.prompt([empNewRole.ask()]).then(chosenRole => {

        connection.query(queryGetRoleId, chosenRole.employee_role, function (error, result) {
            if (error) {
                throw error
            }

const queryUpdateRoleId = `UPDATE employees SET employees.roles_id = (?)WHERE employees.id = (?)`

            const updateEmpRoleId = new querySQL(queryUpdateRoleId, [result[0].id, employeeID])

            updateEmpRoleId.update(startMenu, "Employee Role Updated!");
        })
    })
}

//Update an employees manager
function updateEmployeeManager(employeeID, managerObjectArray) {
    console.log("Entered update employee manager.")

    const queryCurrentManager = `SELECT employees.manager_id
                                 FROM employees
                                 WHERE employees.id = (?);`
    connection.query(queryCurrentManager, employeeID, function (error, result) {
        if (error) {
            throw error;
        }

        const currentManagerID = result[0].manager_id;

        const managerChoices = managerObjectArray.filter(manager => {
            if (manager.ID != currentManagerID) {
                return true;
            };
        })

        possibleNewManagerNames = [];
        for (manager of managerChoices) {
            managerName = "ID: " + manager.ID + " " + manager.firstName + " " + manager.lastName;
            possibleNewManagerNames.push(managerName);
        }

        const newManagerChoice = new startInquirer(typeInquire[2], 'new_Manager', questions.newManager, possibleNewManagerNames)

        inquirer.prompt([newManagerChoice]).then(userChoice => {
            const userInputSplitAtId = userChoice.new_Manager.split(" ", 2);
            const newManagerID = userInputSplitAtId[1];

const queryUpdateNewManager = `UPDATE employees SET employees.manager_id = (?) WHERE employees.id = (?)`

connection.query(queryUpdateNewManager, [newManagerID, employeeID], function (error, result) {
    if (error) {
                    throw error;
                }
    console.log("Manager Updated!");
                startMenu();
            })
        })
    })
}

function viewAllRoles() {
    const query = `SELECT roles.title, roles.salary, departments.name FROM roles INNER JOIN departments ON departments.id = roles.department_id`
    const roleTable = new querySQL(query);

    roleTable.standard_tableQuery(startMenu);
}

function allDepartments() {

    const query = `SELECT departments.name
                    FROM departments`

    const depTable = new querySQL(query);

    depTable.standard_tableQuery(startMenu);
}

function addRole() {

    const queryDepartment = "SELECT departments.name FROM departments;"
    connection.query(queryDepartment, function (error, result) {

        if (error) throw error

        let depNameArr = []
        for (let i = 0; i < result.length; i++) {
            depNameArr.push(result[i].name)
        }

        const whatRole = new startInquirer(typeInquire[0], 'roles_to_add', questions.newRole)
        const whatSalary = new startInquirer(typeInquire[0], 'roles_salary', questions.salary)
        const whatDepartment = new startInquirer(typeInquire[2], 'departments', questions.departments, depNameArr)


        Promise.all([whatRole.ask(), whatSalary.ask(), whatDepartment.ask()]).then(prompts => {
            inquirer.prompt(prompts).then(userChoices => {

                const getDepId = `SELECT departments.id FROM departments WHERE departments.name = (?);`
                connection.query(getDepId, userChoices.departments, function (error, result) {
                    if (error) {
                        throw error
                    }

                    const addRolequery = `INSERT INTO roles (roles.title, roles.salary, roles.departments_id)
                                    VALUES ( (?), (?), (?));`
                    const addRole = new querySQL(addRolequery, [userChoices.role_to_add, userChoices.role_salary, result[0].id]);

                    addRole.update(startMenu, "Role added!");
                })
            })
        })
    })
}


function deleteRole(compRolesArr) {

    console.log("You've entered role delete")

    const whatRole = new startInquirer(typeInquire[2], 'role_to_delete', questions.deleteRole, compRolesArr);
    inquirer.prompt([whatRole.ask()]).then(userChoice => {

        const role_id_Query = `SELECT roles.id FROM roles WHERE roles.title = (?);`
        connection.query(role_id_Query, userChoice.role_to_delete, function (error, result) {

            const roleDeleteID = result[0].id;
            const roleDeleteTitle = userChoice.role_to_delete;

//Checks against the title field to see if role exists
            if (result.length > 1) {
//Role found in other departments
 console.log("Role found in multiple departments!");

const departmentsWithRolequery = `SELECT departments.name, roles.departments_id FROM departments INNER JOIN roles on roles.departments_id = departments.id AND roles.title = (?);`

connection.query(departmentsWithRolequery, userChoice.role_to_delete, function (error, result) {
    if (error) throw error
        const departmentsWithRoleArr = [];
            for (let department of result) {
                        departmentsWithRoleArr.push(departments);
                    }

                    const whichDeparment = new startInquirer(typeInquire[2], 'department_to_delete_Role_From', questions.departmentDeleteRole, departmentsWithRoleArr);

                    inquirer.prompt([whichDeparment.ask()]).then(userChoice => {
                        console.log(result);
                        const departmentName_ID_Arr = result.filter(department => {
                            if (departments.name == userChoice.department_to_delete_Role_From) {
                                return true;
                            }
                        })

                        deleteRoleQuery2 = "DELETE FROM roles WHERE roles.title = (?) AND roles.departments_id = (?)"
                        const deleteInstance2 = new querySQL(deleteRoleQuery2, [roleDeleteTitle, departmentName_ID_Arr[0].departments_id])
                        deleteInstance2.delete(startMenu);
                    })
                })

            } else {
                const deleteRoleQuery = "DELETE FROM roles WHERE rolse.id = (?);"
                const deleteInstance = new querySQL(deleteRoleQuery, roleDeleteID);
                deleteInstance.delete(startMenu);
            }
        })
    })
}

function addDep(depNameArr) {

    const whatDep = new startInquirer(typeInquire[0], 'dep_to_add', questions.newDep)

    inquirer.prompt([whatDep.ask()]).then(userChoice => {

        const alreadyExist = depNameArr.filter(department => {

            if (department.name == userChoice.dep_to_add) return true;
        })

        if (alreadyExist.length >= 1) {
            console.log("Department Already exists!")
            startMenu();
        } else {
            const addDepQuery = `INSERT INTO departments (departments.name) VALUES (?);`
            const addDep = new querySQL(addDepQuery, userChoice.dep_to_add);

            addDep.update(startMenu, "Department added!");
        }
    })
}

function removeDep(depNameArr) {

    const whatDepartment = new startInquirer(typeInquire[0], 'dep_to_delete', questions.deleteDep)

    inquirer.prompt([whatDepartment.ask()]).then(userChoice => {

        const deleteDepQuery = `DELETE FROM departments WHERE departments.name = (?);`
        const deleteDep = new querySQL(deleteDepQuery, userChoice.dep_to_delete);

        deleteDep.update(startMenu, "Department deleted!");
    })
}




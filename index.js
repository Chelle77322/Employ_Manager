//Declares the npm packages required for the scripts to work
const logo = require('asciiart-logo');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const path = require("path");


//Sequelize Connection information
const express = require ('express');
const sequelize = require ('./config/connection');
const app = express();

app.use(express.json());
app.use(express.urlendconded({ extended: true}));
sequelize.sync().then(()=>{
    app.listen(PORT, () => console.log('We are now connected and listening '));
});



//Declaring variable for ORM part
const orm = require("./config/objectRM.js");
const promptUser = require("./config/userPrompt.js");
const table = require('console.table');
const typeInquire = ['input', 'confirm', 'list'];
const startInquirer = require('./lib/inquirer.js');

init();
//Loads the ascii logo 
 function init() {
   const EMlogo = logo ({ name: "Employment Manager",logoColor: 'magenta', borderColor: 'yellow', textColor: 'magenta' }).render();
    console.log(EMlogo);
  };

//Gives the user a menu to choose from
const startMenu = async () =>{
const startMenuChoice = await promptUser.startMenu(); // Start Menu is not a function
    switch (startMenuChoice){
          case `View all records`:
            menuView();
            break;
        case `Create a new employee record`:
            menuCreate();
            break;
        case `Modify an existing record`:
            menuModify();
            break;
        case `Deletes an existing record`:
            menuDelete();
            break;
        case `Finish`:
            orm.endConnection();
            return;
            default:
            break;
    };
    startMenu();
  };
  
const menuDepartment = async () => {
    const dep_id = await promptUser.valueChoice(
        `the ID Number of the Department`
    );
    const viewDepartment = await orm.selectWhereAsync(
        `*`,
        `department`,
        `id`,
        dep_id,
        `id`
    );
    if (viewDepartment.length === 0){
        console.log (`ID not found in employment management database. Please enter new id`);
    const retryDepartment = await promptUser.confirmChoice();
    if(!retryDepartment){
    return startMenu();
    } else {
        return menuDepartment();
    }
    }
    const departmentData = await orm.selectDepartment(dep_id);
    console.table(departmentData);
    return startMenu();
};
  
//Presents the option to delete
const menuDelete = async (table) => {
    let tableName;
    if (typeof table === "undefined"){
        const menuDeleteChoice = await promptUser.menuDelete();
        switch (menuDeleteChoice){
            case `Remove a Employee`:
            tableName = `employee`;
            break;
        case `Remove a Role`:
            tableName = `role`;
            break;
            case `Remove a Department`:
                tableName = `department`;
        }
    } else {
        tableName = table;
    }
    const idDelete = await promptUser.valueChoice(`the ID pf ${tableName} Record to be deleted`);
    const deleteData = await orm.selectWhereAsync(`*`,
    tableName,
    `id`,
    idDelete,
    `id`);
    
//Condition check for valid id
if (deleteData.length === 0){
    console.log(`ID not found in the database. Please try another ID`);
    const retryDelAction = await promptUser.confirmChoice();
    if(!retryDelAction){
        return startMenu();
    }else{
        return menuDelete(tableName);
    }
    
};
startMenu();
//Double check to make sure correct record is being deleted
console.table(deleteData);
console.log(`This table will be deleted. Please confirm`);
const confirmDeletion = await promptUser.confirmChoice();
if (confirmDeletion){
    const deleteQuery = await orm.deleteEmpAsync(tableName, idDelete);
    console.log(deleteQuery.affectedRows !== 0
        ? `Record has been successfully deleted`:
        `Failed to delete record`);
}
else{
    console.log(`Prospective changes have been discarded by user`);
}
 return startMenu();
};
startMenu();// StartMenu is not a function
//Function to modify existing data
const menuModify = async (table) => {
    let tableName;
    //Checks if function is being called from within itself
    if (typeof table === "undefined") {
      const menuModifyChoice = await promptUser.menuModify();
      switch (menuModifyChoice) {
        case `Modify an Employee`:
          tableName = `employee`;
          break;
        case `Modify a Role`:
          tableName = `role`;
          break;
        case `Modify a Department`:
          tableName = `department`;
          break;
      }
    } else {
      tableName = table;
    }
    const tableColumnInfor= await orm.getColumnsAsync(tableName);
    const modifyID = await promptUser.valueChoice(
      `the ID Number of the ${tableName} Record to Modify`
    );
    const dataModify = await orm.selectWhereAsync(
      `*`,
      tableName,
      `id`,
      modifyID,
      `id`
    );
    //Checks if the ID number chosen is valid
    if (dataModify.length === 0) {
      console.log(`ID not found in database. Do you want to try again?`);
      const retryModification = await promptUser.confirmChoice();
      if (!retryModification) {
        return startMenu();
      } else {
        return menuModify(tableName);
      }
    }
    console.table(dataModify);
    const modifyViewArray = [];
    //Chooses columns that can be set by user and not by auto increment
    tableColumnInfor.forEach((element) => {
      if (element.Extra !== "auto_increment") {
        modifyViewArray.push(element.field);
      }
    });
    console.log("Which field do you want to modify?");
    const modifyColumn = await promptUser.choiceArray(modifyViewArray);
    let foreignK;
    //Checks to see if any values are tied to foreign keys
    for (i = 0; i < tableColInfo.length; i++) {
      if (tableColInfo[i].field === modifyColumn) {
        if (tableColInfo[i].key === "MUL") {
          const fkData = await orm.foreignKAsync(tableName, modifyColumn);
          //Queries possible values for validation
          foreignK = await orm.selectAsync(
            fkData[0].REFERENCED_COLUMN_NAME,
            fkData[0].REFERENCED_TABLE_NAME,
            "id"
          );
        }
        const valueModify = await promptUser.columnChoice(
          modifyColumn,
          tableColumnInfor[i].type,
          tableColumnInfor[i].null,
          foreignK
        );
        //Confirms record modification
        console.log(
          `${tableColumnInfor[i].field} will be replaced with ${valueModify}. Proceed?`
        );
        const confirmModification = await promptUser.confirmChoice();
        if (confirmModification) {
          const modifyQuery = await orm.updateEmpAsync(
            tableName,
            columnName,
            columnValue,
            recordID
          );
          //Checks for success of request
          console.log(
            modifyQuery.changedRows !== 0
              ? `Record changed successfully`
              : `Record change failed`
          );
        } else {
          console.log(`Changes discarded`);
        }
      }
      startMenu();
    };
//Handles menuView to show data
const menuView = async () => {
    const menuViewChoices = await promptUser.menuView();
    let dataView;
    let tableName;
    switch  (menuViewChoices){
        case ` View all employees`:
            dataView = await orm.selectAsync ("*", "employee", "id");
            tableName = `employee`;
            break;
        case `View all Roles`:
            dataView = await orm.selectAsync("*", "role", "id");
            tableName = `role`;
            break;
        case `View all Departments`:
        dataView = await orm.selectAsync("*", "department","id");
        tableName = `department`;
        break;
    }
    //Check if filter needs to be applied to queries
    const menuFilter = await promptUser.filterChoice();
    switch (menuFilter){
        case `View All`:
            console.table(dataView);
        break;
        case `View with Filter`:
            console.log(`What criteria do you want to filter the records? \n`);
        const columnView = await promptUser.choiceArray(dataView[0]);
        const view = await promptUser.valueChoice(columnView);
        const filterViewData = await orm.selectWhereAsync("*", tableName, columnView,view, `id`);
        switch (filterViewData.length){
            case 0:
            console.log(`No records where found with that matched the critera\n`);
            break;
            default:
            console.table(filterViewData);
            break;
        }
        break;
    }
    startMenu();
}
const menuCreate = async () => {
    const menuCreateChoice = await promptUser.menuCreate();
    let tableName;
    switch (menuCreateChoice){
        case`Create an Employee`:
        tableName = `employee`;
        break;
        case `Create a Role`:
        tableName = `role`;
        break;
        case `Create a Department`:
        tableName = `department`;
        break;
    }
    startMenu();
//Gets existing table column information
const tableColumnInfor = await orm.getColumnAsync(tableName);
const columnsCreate = [];
const valueCreate = [];
for ( j = 0; j < tableColumnInfor.length; j++) {
    if (tableColumnInfor[j].Extra != "AUTO_INCREMENT"){
        let ForeignK;
        if (tableColumnInfor[j].key === "NULL"){
            const fkData = await orm.getForeignKAsync(tableName, tableColumnInfor[j].field);
            ForeignK = await orm.selectAsync(
                fkData[0].REFERENCED_COLUMN_NAME,
                fkData[0].REFERENCED_TABLE_NAME,
                "id"
            );
        }
const valueCreate = await promptUser.columnChoice(
    tableColumnInfor[j].field,
    tableColumnInfor[j].type,
    tableColumnInfor[j].null,
    ForeignK
);
if(valueCreate !== ""){
    valueCreate.push(valueCreate);
    columnsCreate.push (tableColumnInfor[j].field);
    }
  }
}
//Uses sql query to create the record in mysql database
const queryCreate = await orm.createEmpAsync(tableName, columnsCreate,[valueCreate]);
console.log(queryCreate.affectedRows !== 0
    ? ` Record has been created`:
    `Record failed to be created`);
startMenu();
};
}; 
    
  startMenu();


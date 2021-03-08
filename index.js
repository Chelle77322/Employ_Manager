//Declares the npm packages required for the scripts to work
const logo = require('asciiart-logo');
const mysql = require('mysql2');
const start = require('./lib/inquirer.js');
const inquirer = require('inquirer');
const path = require("path");

//Declaring variable for ORM part
const orm = require("./config/objectRM.js");
const promptUser = require("./lib/userPrompt.js");
const table = require('console.table');

init();
  //Loads the ascii logo 
  function init() {
   
    const EMlogo = logo ({ name: "Employment Manager",logoColor: 'magenta', borderColor: 'magenta', textColor: 'magenta' }).render();
  
    console.log(EMlogo);
  
  };
  //Gives the user a menu to choose from
const startMenu = async () => {
const startMenuChoice = await promptUser.startMenu();

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
    }
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
    const idDelete = await promptUser.valueChoice(`${tableName}`);
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
        return menuDeleteChoice(tableName);
    }
}
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
    const modifyViewData = await orm.selectWhereAsync(
      `*`,
      tableName,
      `id`,
      modifyID,
      `id`
    );
    //Checks if the ID number chosen is valid
    if (modifyViewData.length === 0) {
      console.log(`ID not found in database. Do you want to try again?`);
      const modifyRetry = await promptUser.confirmChoice();
      if (!modifyRetry) {
        return startMenu();
      } else {
        return menuModify(tableName);
      }
    }
    console.table(modifyViewData);
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
          const fkData = await orm.foreignKAsync(tableName, modifyCol);
          //Queries possible values for validation
          foreignK = await orm.selectAsync(
            fkData[0].REFERENCED_COLUMN_NAME,
            fkData[0].REFERENCED_TABLE_NAME,
            "id"
          );
        }
        const modifyValue = await promptUser.columnChoice(
          modifyCol,
          tableColumnInfor[i].type,
          tableColumnInfor[i].null,
          foreignK
        );
        //Confirms record modification
        console.log(
          `${tableColumnInfor[i].field} will be replaced with ${modifyValue}. Proceed?`
        );
        const modifyConfirm = await promptUser.confirmChoice();
        if (modifyConfirm) {
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
    }
    const queryCreate = await orm.createEmpAsync(tableName,columnName,[columnValue,]);
    console.log(queryCreate.affectedRows !== 0
        ? `Record has been created`
        : `Record creation failed`
    );
    startMenu();
  };
  startMenu();

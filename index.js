//Declares the npm packages required for the scripts to work
const logo = require('asciiart-logo');
const orm = require("./config/objectRM.js");
const mysql = require('mysql2');
const table = require('table');
const start = require('./lib/inquirer.js');
const inquirer = require('inquirer');
const path = require("path");
const promptUser = require("./lib/userPrompt");

init();
  //Loads the ascii logo 
  function init() {
   
    const EMlogo = logo ({ name: "Employment Manager",logoColor: 'magenta', borderColor: 'magenta', textColor: 'magenta' }).render();
  
    console.log(EMlogo);
  
  };
  const menuChoice = async () => {
      const menuChoice = await promptUser.menuChoice();
      switch (menuChoice){
          case `View all records`:
              menuView();
              break;
        case `Create a new employee record`:
                menuCreate();
                break;
        case `Modify an existing record`:
            menuModify();
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
            case `Remove Employee`:
            tableName = `employee`;
            break;
        case `Remove a Role`:
            tableName = `role`;
            break;
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
if (deleteData.length ===0){
    console.log(`ID not found in the database. Please try another ID`);
    const retryDelAction = await promptUser.confirmChoice();
    if(!retryDelAction){
        return menuChoice();
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
menuChoice();
};
//Function to modify existing data
const menuModify = async (table) => {
    let tableName;
    //Checks if function is being called from within itself
    if (typeof table === "undefined") {
      const menuModifyChoice = await uprompt.menuModify();
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
    const modifyID = await uprompt.valueChoice(
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
      const modifyRetry = await uprompt.confirmChoice();
      if (!modifyRetry) {
        return menuChoice();
      } else {
        return menuModify(tableName);
      }
    }
    console.table(modifyViewData);
    const modifyViewArray = [];
    //Chooses columns that can be set by user and not by auto increment
    tableColumnInfor.forEach((element) => {
      if (element.Extra !== "auto_increment") {
        modifyViewArray.push(element.Field);
      }
    });
    console.log("Which field do you want to modify?");
    const modifyCol = await uprompt.arrayChoice(modifyViewArray);
    let foreignK;
    //Checks to see if any values are tied to foreign keys
    for (i = 0; i < tableColInfo.length; i++) {
      if (tableColInfo[i].Field === modifyCol) {
        if (tableColInfo[i].Key === "MUL") {
          const fkData = await orm.getFKAsync(tableName, modifyCol);
          //Queries possible values for validation
          foreignK = await orm.selectAsync(
            fkData[0].REFERENCED_COLUMN_NAME,
            fkData[0].REFERENCED_TABLE_NAME,
            "id"
          );
        }
        const modifyValue = await uprompt.colChoice(
          modifyCol,
          tableColumnInfor[i].Type,
          tableColumnInfor[i].Null,
          foreignK
        );
        //Confirms record modification
        console.log(
          `${tableColumnInfor[i].Field} will be replaced with ${modifyValue}. Proceed?`
        );
        const modifyConfirm = await promptUser.confirmChoice();
        if (modifyConfirm) {
          const modifyQuery = await orm.updateAsync(
            tableName,
            modifyCol,
            modifyValue,
            modifyID
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
        console.log(`----------------------------------------`);
      }
    }
    menuChoice();
  };

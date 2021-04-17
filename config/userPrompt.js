const inquirer = require("inquirer");

const userPrompt = {
    //Shows all user choices available
    listReturn : async(listChoices) => {
        const questions = {
            name: `startMenuChoice`,
            type: `list`,
            choices: listChoices.choices,
            
        };
        
        const {menuChoice} = await inquirer.prompt(questions);
        return menuChoice;
        
    },
    //Confirms the choice made by user
confirmedChoice: async () => {
    const questions = {
        message: `Select an option from the menu:`,
        name: `confirmedChoice`,
        type: `confirm`,
    };
    const {confirmedChoice} = await inquirer.prompt(questions);
  
    return confirmedChoice;
},
//Returns free choice options
//columnChoice: async (field, type, nullOption, FKvalue) => {
//    const questions = {
 //     message: `Enter a Value for ${field}:`,
 //     name: `valueChoice`,
 //     type: `input`,
 //     validate: async function (data) {
 //       //Checks if a null option is possible.
 //       if (nullOption === "NO" && data === "") {
 //         return "This entry can not be blank";
 //       } else if (nullOption === "YES" && data === "") {
   //       return true;
    //    }
        //Checks if foreign key parameters were passed and whether the input meets the requirement
       // if (typeof fkValues !== "undefined") {
         // for (j = 0; j < fkValues.length; j++) {
         //   if (String(Object.values(fkValues[j])) === String(data)) {
          //    return true;
          //  }
         // }
         // if (nullOption === "NO") {
         //   return `This value does not match an existing ${field}. Enter a valid ${field} choice.`;
         // } else {
         //   return `This value does not match an existing ${field}. Enter a valid ${field} choice or leave it blank.`;
        //  }
      //  }
        //Checks type from MySql columns and validates using JOI
        //if (type.toLowerCase().includes("varchar")) {
          //return joi.validate({ name: data }, schema, function (err, value) {
            //if (err) {
              //return `Value should be a string without special characters`;
            //}
            //return true;
         // });
       // }
       // if (type.toLowerCase().includes("int")) {
         // return joi.validate({ int: data }, schema, function (err, value) {
          //  if (err) {
            //  return `Value should be a positive integer`;
           // }
           // return true;
          //});
       // }
       // if (type.toLowerCase().includes(`decimal(10,0)`)) {
         // return joi.validate({ decimal: data }, //schema, function (err, value) {
           // if (err) {
             // return `Value should be a positive number with no decimal points`;
           // }
          //  return true;
         // });
       // }
    //  },
   // };
  //  const { confirmedChoice } = await inquirer.prompt(questions);
  //  return confirmedChoice;
  //},

  //Value choice without validation
  Vchoice: async (valueName) => {
    const questions = {
      message: `Enter a Value for ${valueName}:`,
      name: `confirmedChoice`,
      type: `input`,
    };
    const { Vchoice } = await inquirer.prompt(questions);
  
    return Vchoice;
  },

  //Menus where only the data being passed as choices changes.
  startMenu: () => {
    const options = {
      choices: [
        `View Records`,
        `Create a Record`,
        "Modify a Record",
        "Delete a Record",
        "View Department Budget",
        "Exit",
      ],
    };
    return userPrompt.listReturn(options);
  },

  menuCreate: () => {
    const options = {
      menuChoice: [`Create an Employee`, `Create a Role`, `Create a Department`],
    };
    
    return userPrompt.listReturn(options);
  },

  menuView: () => {
    const options = {
      menuViewChoice: [`View Employees`, `View Roles`, `View Departments`],
    };
    
    return userPrompt.listReturn(options);
  },

  menuModify: () => {
    const options = {
      menuModifyChoice: [`Modify an Employee`, `Modify a Role`, `Modify a Department`],
     
    };
  
    return userPrompt.listReturn(options);
    
  },

  menuDelete: () => {
    const options = {
      menuDelete: [`Delete an Employee`, `Delete a Role`, `Delete a Department`],
    };
    return userPrompt.listReturn(options);
  },
  filterChoice: () => {
    const options = {
      menuFilter: [`View All`, `View With Filter`],
    };
    return userPrompt.listReturn(options);
  },

  arrayChoice: (array) => {
    const options = {
      choices: array,
    };
    return userPrompt.listReturn(options);
  },
};

module.exports = userPrompt;


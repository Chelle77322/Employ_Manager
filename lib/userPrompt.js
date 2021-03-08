const inquirer = require("inquirer");

const promptUser = {
//Shows all user choices available
listReturn : async(choices) => {
    const questions = {
        name: `userChoice`,
        type: `list`,
        choices: listChoices.choices,
    };
    const {userChoice} = await inquirer.prompt(questions);
    return userChoice;
},
//Confirms the choice made by user
confirmChoice: async () => {
    const questions = {
        message: `Select an option from the menu:`,
        name: `confirmedChoice`,
        type: `confirm`,
    };
    const {confirmedChoice} = await inquirer.prompt(questions);
    return confirmedChoice;
},
//Gives all open choices to user with validation
columnChoice: async (field, type, nullOption, foreignK) => {
    const questions = {
        message:`Enter a value for ${field}:`,
        name: `valueChoice`,
        type: `input`,
        validate: async function (data) {
            if (nullOption === "NO" && data === ""){
                return "Cannot be blank";
            }
            else if (nullOption == "YES" && data === ""){
                return true;
            }
//passes foreign key parameters
if (typeof foreignK !== "undefined"){
    for(k = 0; k < foreignK.length; k++){
        if (String(Obkect.values(foreignK[k])) === String(data)){
            return true;
        }
    }
    if (nullOption === "NO"){
        return `This doesn't match an existing ${field}. You need to enter another ${field} choice.`;
    } else{
        return `This doesn't match an existing ${field}. You need to enter another ${field} choice or leave it empty`;
    }
   
    }

},
valueChoice: async (valueName) => {
    const questions = {
        message: `Enter a value for ${valueName}:`,
        name : `valueChoice`,
        type: `input`,
    };
   const {valueChoice} = await inquirer.prompt(questions);
   return valueChoice
    },
    menuChoice: () => {
        const options = {
            choices: [
                `View Records`,
                `Create Records`,
                `Modify Records`,
                `Delete Records`,
                `Finish`,
            ],
        };
        return promptUser.listReturn(options);
    },
    menuCreate: () => {
        const options ={
            choices:[`Create an Employee`, `Create a Role`, `Create a Department`],
        };
    menuView: () => {
        const options = {
            choices: [`View all employees`, `View all roles`, `View all departments`],
        };
        return promptUser.listReturn(options);
    }

    },
    menuModify: () => {
        const options = {
            choices: [`Modify employees`, `Modify roles`, `Modify departments`],
        };
        return promptUser.listReturn(options);
    },
    menuDelete: () => {
        const options = {
            choices: [`Delete employees`, `Delete roles`, `Delete departments`],
        };
        return promptUser.listReturn(options);
    },
    filterChoice: () => {
        const options = {
            choices: [`View All`,`View with filter applied`],
        };
        return promptUser.listReturn(options);
    },
    choiceArray: (array) => {
        const options = {
            choices: array,
        };
        return promptUser.listReturn(options);
    },
};

    }
};
module.exports = promptUser;
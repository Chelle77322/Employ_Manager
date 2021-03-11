//Calling the npm package inquirer
const inquirer = require('inquirer');
//Creating the class startInquirer
class startInquirer{
  constructor(type, name, message, choices){
    this.type = type;
    this.name = name;
    this.message = message;
    this.choices = choices;
  }

}
module.exports = startInquirer;
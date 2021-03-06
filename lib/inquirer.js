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

//start asking for user input
ask(){
const objectAsk = {
  type: this.type,
  name: this.name,
  message: this.message

}
//Condition check
if (this.choices === "undefined"){
  return objectAsk
} else{
  objectAsk.choices = this.choices;
  return objectAsk;
}
}
}
module.exports = startInquirer
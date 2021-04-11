//import models
const departments = require('./departments');
const employees = require ('./employees');
const roles = require('./roles');

//Department ID belongsTo Roles Table
//departments.belongsTo(roles,
//{
  //  foreignKey: 'departments_id',
//});

//Roles ID belongs to Employees Table
//roles.belongsTo(departments,
  //  {
    //    foreignKey: 'roles_id',
    //});
//Manager ID belongs to Employee Table
//employees.belongsTo(employees,
  //  {
    //    foreignKey: 'manager_id',
    //});
module.exports = {
departments,
employees,
roles,
}
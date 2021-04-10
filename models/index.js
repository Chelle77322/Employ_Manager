//import models
const departments = require('./departments');
const employees = require ('./employees');
const roles = require('./roles');

//Department ID belongsTo Roles Table
departments.belongsTo(roles,
{
    foreignKey: 'departments_id',
});

//Roles ID belongs to Employees Table
roles.belongsTo(employees,
    {
        foreignKey: 'roles_id',
    });
//Manager ID belongs to Employee Table
employees.belongsTo(employees,
    {
        foreignKey: 'manager_id',
    });
modules.exports = {
departments,
employees,
roles
}
const {roles} = require('../models');
const { bulkCreate } = require('../models/employees');
const rolesData = [
    {
    roles_name: 'Payroll Administrator',
},
{
    roles_name: 'Software Engineer',

},
{
    roles_name: 'Executive Assistant',
},
{
    roles_name: 'Marketing',
},
];
const seedRoles = () => roles.bulkCreate(rolesData);
module.exports = seedRoles;
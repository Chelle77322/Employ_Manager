const {departments} = require('../models');
const departmentData = [
    {
    department_name: 'Human Resources',
},
{
    department_name: 'Web Development',

},
{
    department_name: 'Engineering',
},
{
    department_name: 'Marketing',
},
];
const seedDepartments = () => departments.bulkCreate(departmentData);
module.exports = seedDepartments;
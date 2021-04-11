const {departments} = require('../models');
const departmentData = [
    {
    departments_name: 'Human Resources',
},
{
    departments_name: 'Web Development',

},
{
    departments_name: 'Engineering',
},
{
    departments_name: 'Marketing',
},
];
const seedDepartments = () => departments.bulkCreate(departmentData);
module.exports = seedDepartments;
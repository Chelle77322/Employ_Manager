const seedDepartments = require('./departments_seed');
const seedEmployees = require ('./employee_seed');
const seedRoles = require('./roles_seed');

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync ({ force: true});
   
};
seedAll();
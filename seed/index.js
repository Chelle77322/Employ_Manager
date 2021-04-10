const seedDepartments = require('./departments_seed');
const seedEmployees = require ('./employee_seed');
const seedRoles = require('./roles_seed');

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync ({ force: true});
    console.log ('\n --- DATABASE SYNCED ---- \n');
    await seedDepartments();
    console.log ('\n--- DEPARTMENTS SEEDED ---\n');
    await seedEmployees ();
    console.log('\n --- EMPLOYEES SEEDED --- \n');
    await seedRoles();
    console.log('\n ---ROLES SEEDED --- \n');
    process.exit(0);
};
seedAll();
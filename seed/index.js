const departments = require('./department_seed');
const employees = require ('./employee_seed');
const roles = require('./roles_seed');

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync ({ force: true});
    console.log ('\n --- DATABASE SYNCED ---- \n');
    await departments();
    console.log ('\n--- DEPARTMENTS SEEDED ---\n');
    await employees ();
    console.log('\n --- EMPLOYEES SEEDED --- \n');
    await roles();
    console.log('\n ---ROLES SEEDED --- \n');
    process.exit(0);
};
seedAll();
const {employees} = require ('../models');
const { bulkCreate } = require('../models/departments');
const employeesData = [
    {
       first_name: 'Michelle' ,
    },
    {
        last_name:  'Hall',
    },
    {
        first_name: 'Roger' ,
     },
     {
         last_name:  'McGregor',
     },
     {
        first_name: 'Connor' ,
     },
     {
         last_name:  'Tape',
     },
     {
        first_name: 'Saoirse' ,
     },
     {
         last_name:  'Hall',
     },
     {
        first_name: 'Max' ,
     },
     {
         last_name:  'Paparella',
     },

];
const seedEmployees = () => employees/bulkCreate(employeesData);
module.exports = seedEmployees
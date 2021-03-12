const Sequelize = require('sequelize');
require ('dotenv').config({path: __dirname +`/../env`});
require ('config-json');


//Accessing the environment variables to use to connect to mySQL database employment_managementDB
let sequelize;
if(process.env.JAWSDB_URL){
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize (
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host:'localhost',
      dialect:'mysql',
      port: 3306
    }
    
);
  }

module.exports = sequelize;







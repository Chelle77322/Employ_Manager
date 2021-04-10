const {Model, DataTypes} = require ('sequelize');
const sequelize = require('../config/connection');

class employees extends Model {}
employees.init( {
   
	id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement:true
    },
    first_name:{
        type: DataTypes.STRING,
        varchar:(30),
        allowNull: false
    },
    last_name:{
        type: DataTypes.STRING,
        varchar:(30),
        allowNull: false
    },
    role_id: 
    {
        type: DataTypes.INTEGER,
        references: 
        {model: 'role', key: 'id',},
    },
    manager_id:{
        type: DataTypes.INTEGER,
       
    }
},
{

    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'employees',
}    

);

module.exports = employees;
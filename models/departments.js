const  {Model, DataTypes} = require ('sequelize');
const sequelize = require ('../config/connection');

class departments extends Model {}

departments.init({
    //defines the columns for the department table
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement:true
    },
    departments_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
        roles_id: 
    {
        type: DataTypes.INTEGER,
        references: 
        {model: 'roles', key: 'id',},
    },

    
},
{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'departments',
}
);
module.exports = departments;
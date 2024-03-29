const  {Model, DataTypes} = require ('sequelize');
const sequelize = require ('../config/connection');

class roles extends Model {}

roles.init({
    //defines the columns for the departments table
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement:true,
       
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
       
    },
    salary: {
        type:DataTypes.DECIMAL,
        allowNull: false,
       
    },
},
{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'roles',
}
);
module.exports = roles;
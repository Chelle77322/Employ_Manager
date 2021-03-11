const {Model, DataTypes} = require('sequelize');
const Sequelize = require('../config/connection');

class Department extends Model {}
Department.init(
    {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING
    },
    },
    {
Sequelize,
//DON'T RENAME EXISTING TABLE
freezeTableName: true,
underscored: true,
modelName: 'department'
}
);
module.export = Department;
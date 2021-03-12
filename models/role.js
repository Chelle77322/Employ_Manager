const {Model, DataTypes} = require('sequelize');
const Sequelize = require('../config/connection');

class Role extends Model {}
Role.init(
    {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title:{
        type: DataTypes.STRING
    },
    salary:{
        type: DataTypes.DECIMAL
    },
    department_id:{
        type: DataTypes.INTEGER,

    }
    },
    {
Sequelize,
//DON'T RENAME EXISTING TABLE
freezeTableName: true,
underscored: true,
modelName: 'role'
}
);
module.export = Role;
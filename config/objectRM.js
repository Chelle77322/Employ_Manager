const connection = require('./connection');
const orm = {
    endConnection: () => {
        connection.end ();
console.log(connection);
    },
//Select columns from any table in the employment_managementDB
selectAsync: (tableColumn, tableName, sortColumn)=> {
    return new Promise((resolve, reject) => {
        const queryString = "SELECT ?? FROM ?? ORDER BY ??";
        connection.query(
            queryString,
            [tableColumn, tableName, sortColumn],
            (error, result) => {
                if(error) reject(error);
                resolve(result);
            }
        );

    });
},
//Selects columns from any table when they met a single where condition
selectWhereAsync: (tableColumn, tableName, columnName, columnValue, sortColumn) => {
    return new Promise((resolve, reject) => {
        const queryString = "SELECT ?? FROM ?? WHERE ?? = ? ORDER BY ??";
        connection.query(
            queryString, 
            [tableColumn, tableName, columnName, columnValue, sortColumn],
            (error, result) => {
                if (error) reject(error);
                resolve(result);
            
            }
        );
    });
},
//Displays employee count for a department
selectDepartments: (id) => {
    return new Promise ((resolve, reject)=>{
        const queryString = 
        connection.query(queryString, [id], (error, result)=> {
            if (error) reject (error);
            resolve(result);
            console.log(connection);
        });
    });
},

//Creates records for the tables in the database
createAsync: (tableName, columnName, columnValue) => {
    return new Promise((resolve, reject)=>{
        const queryString = "INSERT INTO ?? (??) VALUES ?";
        connection.query(
            queryString, [tableName, columnName, columnValue],
            (error, result) => {
                if(error) reject(error);
                resolve(result);
            }
        );
    });
},
//Add new employee records to the tables in the database
createEmpAsync: (tableName, columnName, columnValue) =>{
    return new Promise ((resolve, reject) => {
        const queryString = "INSERT INTO ?? (??) VALUES ?";
        connection.query (
            queryString, 
            [tableName, columnName, columnValue],
            (error, result) => {
                if (error) reject(error);
            }
        );
    });
},
//Updates records in the database
updateAsync: (tableName, columnName, columnValue, record_id) => {
    return new Promise ((resolve, reject)=>{
    const queryString = "UPDATE ?? SET ?? = ? WHERE id = ?";
    connection.query(
        queryString,
        [tableName, columnName, columnValue, record_id],
        (error, result) => {
            if (error) reject (error);
            resolve(result);
        }
    );
});
},

//Deletes any employee record 
deleteAsync: (tableName, record_id) => {
    return new Promise ((resolve, reject) =>{
        const queryString = "DELETE FROM ?? WHERE id = ?";
        connection.query(queryString,
            [tableName, record_id],
            (error, result) =>{
                if (error) reject (error);
                resolve(result);
            });

    });
},
//Shows column values for any table
getColumnAsync: (tableName) => {
    return new Promise ((resolve, reject) => {
        const queryString = "SHOW COLUMNS FROM ??";
        connection.query(queryString, [tableName], (error, result) => {
            if (error) reject (error);
                resolve(result)
        });
    });
},
//Selects foreign key information as it relates
foreignKAsync: (tableName, columnName) => {
    return new Promise ((resolve, reject) => {       
        const queryString = "SELECT DISTINCT a.REFERENCED_TABLE_NAME, a.COLUMN_NAME, a.REFERENCED_COLUMN_NAME FROM employ_seed.KEY_COLUMN_USAGE a JOIN employ_seed.REFERENTIAL_CONSTRAINTS b USING (CONSTRAINT_NAME) WHERE a.TABLE_SCHEMA = 'employment_managementDB' AND a.TABLE_NAME = ? AND a COLUMN_NAME = ?";
        connection.query(queryString, [tableName, columnName], (error, result)=> {
            if(error)reject (error);
            resolve(result);
        });
    });
},
//Shows the budget for a Department
selectDepartmentBudget:(departments_id) => {
    return new Promise ((resolve, reject) => {
        const queryString = "select departments.id, sum(salary) AS salary, count(employees.id)as employees,departments.name AS 'department name' from employees join roles on employees.roles.id = roles.id join departments on roles.departments.id = departments.id where departments.id = ?";
    connection.query(queryString, [departments_id],
     (error, result) => {
         if(error) reject(error);
         resolve(result);
     });
    });
},

};
module.exports = orm;

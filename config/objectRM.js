const connection = require('./connection');
const orm = {
    endConnection: () => {
        connection.end ();
console.log(connection);
    },
//Select columns from any table in the employment_managementDB
selectAsync: (tableColumn, tableName, sortColumn)=> {
    return new Promise((resolve, reject) =>{
        const queryString = "SELECT * FROM employees ORDER BY id";
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
//Updates records for employee
updateEmpAsync: (tableName, columnName, columnValue, recordID) => {
    return new Promise ((resolve, reject)=>{
    const queryString = "UPDATE ?? SET ?? = ? WHERE id = ?";
    connection.query(
        queryString,
        [tableName, columnName, columnValue, recordID],
        (error, result) => {
            if (error) reject (error);
            resolve(result);
        }
    );
});
},

//Deletes any employee record 
deleteEmpAsync: (tableName, recordID) => {
    return new Promise ((resolve, reject) =>{
        const queryString = "DELETE FROM ?? WHERE id = ?";
        connection.query(queryString,
            [tableName, recordID],
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
    });
},

};
module.exports = orm;

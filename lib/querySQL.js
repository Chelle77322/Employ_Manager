const Sequelize = require('../config/connection');
console.log(Sequelize);
const table = require("table");


//Constructing the class querySQL
class querySQL{
    constructor(query, value){
        this.query = query;
        this.value = value;
    }

standard_tableQuery(employees) {
    connection.query(this.query, this.value, function (error, result){
        if(error) throw error
        console.log(result);
        result.end();
        employees();
        console.log("\n");
        console.log(table);
        console.log("\n");
        employees();
        
    });
    }
    startQuery(nextPart, parameterToPassToNextPart){
        connection.query(this.query, this.value, function(error,result){
            if(error) throw error
            let arrayTitle = []
            for (let j = 0; j < result.length; j++)
            {
                arrayTitle.push(result[j].title)
            }
            nextPart(arrayTitle, parameterToPassToNextPart);
        });
    }
        getQueryNoRepeats(nextPart,parameterToPassToNextPart) {

            connection.query(this.query, this.values, function (error, result) {
                if (error) throw error
                let titleArr = []
                for (let i = 0; i < result.length; i++) {
                    if (!titleArr.includes(result[i].title)) {
                        titleArr.push(result[i].title)
                    }
                }
                nextPart(titleArr, parameterToPassToNextPart);
            })
        }
        
 };


 //Deletes
 delete(nextPart => {
     connection.query(this.query, this.value, function(error,result){
        if (error) throw error
        console.log("Deletion is successful");
        nextPart();

    });
});


module.exports = querySQL;
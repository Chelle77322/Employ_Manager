
const Sequelize = require('../config/connection');
console.log(Sequelize);
const table = require("table");


//Constructing the class querySQL
class querySQL{
    constructor(query, value){
        this.query = query;
        this.value = value;
    }

standard_tableQuery(employee) {
    connection.query(this.query, this.value, function (error, result){
        if(error) throw error
        console.log(result);
        result.end();
        employee();
        console.log("\n");
        console.log(table);
        console.log("\n");
        employee();
        
    })
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
        })
    }
        getQueryNoRepeats(nextPart,parameterToPassToNextPart) {

            connection.query(this.query, this.values, function (err, res) {
                if (err) throw err
                let titleArr = []
                for (let i = 0; i < res.length; i++) {
                    if (!titleArr.includes(res[i].title)) {
                        titleArr.push(res[i].title)
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
}
 
//Updates
update(nextPart, message =>{
   connection.query(this.query, this.value, function(error, result){
        if (error) throw error
        console.log(message);
        nextPart();
    });
}
//Returns the query result
//returnQuery(nextPart){
  //  connection.query(this.query, this.value, function(error, result){
    //    if (error) throw error
      //  nextPart(result);
    //})
//}

//}

module.exports = querySQL;
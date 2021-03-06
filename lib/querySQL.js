//Calling npm packages required
const mysql = require("mysql");
const connection = require("../index");
const table = require("table");


//Constructing the class querySQL
class querySQL{
    constructor(query, value){
        this.query = query;
        this.value = value;
    }

standard_tableQuery(nextPart) {
    connection.query(this.query, this.value, function (error, result){
        if(error) throw error
        console.log(result);
        result.end();
        nextPart();
        console.log("\n");
        console.log(table);
        console.log("\n");
        nextPart();
        
    })
    }
    startQuery(nextPart, parameterToPassTonextPart){
        connection.query(this.query, this.value, function(error,result){
            if(error) throw error
            let arrayTitle = []
            for (let j = 0; j < result.length; j++)
            {
                arrayTitle.push(result[j].title)
            }
            nextPart(arrayTitle, parameterToPassTonextPart);
        })
        
 }
 //Deletes
 delete(nextPart){
     connection.query(this.query, this.value, function(error,result){
        if (error) throw error
        console.log("Deletion is successful");
        nextPart();

     })
 }
//Updates
update(nextPart, message){
    connection.query(this.query, this.value, function(error, result){
        if (error) throw error
        console.log(message);
        nextPart();
    })
};
//Returns the query result
returnQuery(nextPart){
    connection.query(this.query, this.value, function(error, result){
        if (error) throw error
        nextPart(result);
    })
}

}

module.exports = querySQL;
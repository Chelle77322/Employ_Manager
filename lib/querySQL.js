//Calling npm packages required
const mysql = require('mysql');
const connection = (mysql.createConnection);
const table = require('table');
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
    })
    }
    startQuery(nextPart, parameterToPassTonextPart){
        connection.query(this.query, this.value, function(error,result){
            if(error) throw error
            let arrayTitle = []
            for (let j = 0; j < result.length; j++)
            {
                arrayTitle.push(result[i].title)
            }
        })
        nextPart(arrayTitle, parameterToPassTonextPart);
    
        }
    }


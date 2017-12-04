var query = require('../../../../../db/msql');
var cardsets = {};


// Define the properties that all cards have
cardsets.Card = function(code){

    this.code = code; // Eg: DAC1311

}


// All targets will inherit Card and specific functions are defined to verify if it do belong to the group
// Group: 必修 核心

cardsets.Compulsory = function(code, type, sId){
    
    this.code = code; // Eg: DAC1311
    this.type = type; // Eg: 必修
    this.sId = sId;   // Eg: 0312512
};

cardsets.Compulsory.prototype = new cardsets.Card();

cardsets.Compulsory.prototype.check = function(callback){
    let checkCode = this.code;
    let checkType = this.type;
    let studentId = this.sId;
    // check if the course code exist in the group table
    query.Group(studentId, function(err, result){
        let table = JSON.parse(result);    
        for(let i = 0; i < table.length && checkType === "必修" ; i++){
            for(let j = 0; j < table[i].cos_codes.length; j++){
                if(table[i].cos_codes[j] === checkCode){
                    callback(true);
                    return;
                }
            }
        }
        callback(false);
    });

}

cardsets.Core = function(code, type, sId){
    
    this.code = code; // Eg: DAC1311
    this.type = type; // Eg: 必修
    this.sId = sId;   // Eg: 0312512
    
};

cardsets.Core.prototype = new cardsets.Card();

cardsets.Core.prototype.check = function(callback){
    let checkCode = this.code;
    let checkType = this.type;
    let studentId = this.sId;
    // check if the course code exist in the group table
    // group's
    query.Group(studentId, function(err, result){
        console.log(studentId);
        console.log(checkType);
        let table = JSON.parse(result);    
        for(let i = 0; i < table.length && checkType === "選修" ; i++){
            console.log(i + ": " + table[i].type);
            for(let j = 0; j < table[i].cos_codes.length && table[i].type === "核心"; j++){
                if(table[i].cos_codes[j] === checkCode){
                    callback(true);
                    return;
                }
            }
        }
        callback(false);
    });

}

cardsets.SecondaryCore = function(code, type, sId){
    
    this.code = code; // Eg: DAC1311
    this.type = type; // Eg: 必修
    this.sId = sId;   // Eg: 0312512
    
};

cardsets.SecondaryCore.prototype = new cardsets.Card();

cardsets.SecondaryCore.prototype.check = function(callback){
    let checkCode = this.code;
    let checkType = this.type;
    let studentId = this.sId;
    // check if the course code exist in the group table
    // other group's core or secondary core -> not core and compulsory
    query.Group(studentId, function(err, result){
        let table = JSON.parse(result);    
        for(let i = 0; i < table.length && checkType === "選修" ; i++){
            for(let j = 0; j < table[i].cos_codes.length && (table[i].type !== "必修" && table[i].type !== "核心"); j++){
                if(table[i].cos_codes[j] === checkCode){
                    callback(true);
                    return;
                }
            }
        }
        callback(false);
    });

}
exports.cardset = cardsets;

var express = require('express');
var router = express.Router();
var query = require('../../../db/msql');
var utils = require('../../../utils');

var csrf = require('csurf');
var csrfProtection = csrf();



        query.showCosMapIntro("資料結構", function(err,result){
            if(err){
                return next(err); // haven't handle yet
            }
        
            console.log(result);
       });
module.exports = router;

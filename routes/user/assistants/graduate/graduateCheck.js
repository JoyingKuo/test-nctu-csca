"use strict"
const request = require('request');
var express = require('express');
var utils = require('../../../../utils');
var query = require('../../../../db/msql');
var utils = require('../../../../utils');
var csrf = require('csurf');
var router = express.Router();
var csrfProtection = csrf();
var getStudentId = require('../../course/getStudentId');


var StudentId = getStudentId.getStudentId.studentId;

router.post('/assistants/graduate/check', csrfProtection, function(req, res){

    if(req.session.profile){
         var info ={
            id: req.body.student_id,
            graduate_submit: req.body.graduate_submit,
            submit_type: 2
         }
         //console.log(info);
        query.SetGraduateSubmitStatus(info,function(err,result){
            if(err){
                throw err;
                res.redirect('/')
            }
            if(!result)
                res.redirect('/')
            else{
                var signal = {
                    signal: 1
                }

                res.send(JSON.parse(result));
            }


        });
            
    }
    else
        res.redirect('/');
});

router.get('/assistants/graduate/check',StudentId,function(req, res){
    let personId = res.locals.studentId;
    //console.log( "yoyoo" + personId);
    query.ShowUserInfo(personId, function(err, result){
        if(err){
            ////console.log(err);
            res.redirect('/');
        }
        else {
            result = JSON.parse(result);

            var checkState = { 
                check:{
                    state: (result[0].graduate_submit == null)?0:parseInt(result[0].graduate_submit)
                }
            }
            res.send(checkState)
        }
    });
});


module.exports = router;


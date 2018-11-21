"use strict"
const request = require('request');
var express = require('express');
var utils = require('../../../../utils');
var query = require('../../../../db/msql');
var utils = require('../../../../utils');
var router = express.Router();

var csrf = require('csurf');
var csrfProtection = csrf();

var getStudentId = require('../../course/getStudentId');


var StudentId = getStudentId.getStudentId.studentId;
router.post('/students/graduate/check', csrfProtection, StudentId, function(req, res){

    if(req.session.profile){
        let personId = res.locals.studentId;
        let submitType = req.body.general_course.type;
        let net_media = req.body.professional_field;
        let info = {id: personId, graduate_submit:1,submit_type:submitType, net_media:net_media};
        query.SetGraduateSubmitStatus(info,function(err,result){
             if(err){
            ////console.log(err);
            res.redirect('/');
            }
            else {
                 var checkState = { 
                    check:{
                        state: 1
                    },
                    general_course:{
                        type: parseInt(submitType)
                    }
                }
                res.send(checkState);

            }
        });
    }
    else{
        res.redirect('/')
    }
});

router.get('/students/graduate/check',StudentId,function(req, res){
    let personId = res.locals.studentId;
    //console.log(personId);
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
                },
                general_course:{
                    type: (result[0].submit_type == null)?null:parseInt(result[0].submit_type)

                },
                professional_field: (result[0].net_media == null)?0:parseInt(result[0].net_media)
            }
            res.send(checkState)
        }
    });
});


module.exports = router;


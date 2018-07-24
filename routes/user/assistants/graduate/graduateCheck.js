"use strict"
const request = require('request');
var express = require('express');
var utils = require('../../../../utils');
var query = require('../../../../db/msql');
var utils = require('../../../../utils');
var getStudentId = require('../../course/getStudentId');
var csrf = require('csurf');
var router = express.Router();
var studentId = getStudentId.getStudentId.studentId; 
var csrfProtection = csrf();

router.post('/assistants/graduate/check', studentId, csrfProtection, function(req, res){
    var submit = req.body.check.state;
    var studentId = req.body.params.student_id;
    console.log(studentId);
    if(req.session.profile && submit){
        setSubmitState(studentId);
        res.send({ check: {state: true } });
    }
    else
        res.send({ check: {state: false } });
});

router.get('/assistants/graduate/check', studentId, function(req, res){
    let personId = res.locals.studentId;
    query.ShowUserInfo(personId, function(err, result){
        if(err){
            res.redirect('/');
        }
        else {
            if(JSON.parse(result)[0].graduate_submit === "1")
                res.send({ check: {state: true } });
            else
                res.send({ check: {state: false } });
        }
    });
});

var setSubmitState = function(studentId){
  query.SetGraduateSubmitStatus(studentId, '1');
}

module.exports = router;


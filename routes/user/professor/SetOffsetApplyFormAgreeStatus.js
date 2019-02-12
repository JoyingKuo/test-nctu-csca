var express = require('express');
var router = express.Router();
var query = require('../../../db/msql');
var csrf = require('csurf');
var csrfProtection = csrf();
var fs = require('fs');

router.post('/professors/SetOffsetApplyFormAgreeStatus', csrfProtection, function(req, res){
//router.get('/assistants/SetOffsetApplyFormAgreeStatus', function(req, res){

        if(req.session.profile){
            for(var i = 0; i < req.body.courses.length; i++){
                var data = {
                    student_id: req.body.courses[i].sid,
                    cos_cname_old: req.body.courses[i].cosname,
                    cos_code_old: req.body.courses[i].coscode,
                    state: req.body.status, // 0:尚未決定, 1:助理同意, 2:主任同意, 3:主任不同意
                    transferto: []
                }
                query.SetOffsetApplyFormAgreeStatus(data, function(err,result){
                    if(err){
                        throw err;
                        res.redirect('/');
                    }
                    if(!result)
                        res.redirect('/');
                    else{
                        result = JSON.parse(result);
                        // console.log(result);
                        res.send(result); 
                    }
                });                           
            }
        }
        else
            res.redirect('/');
});

module.exports = router;

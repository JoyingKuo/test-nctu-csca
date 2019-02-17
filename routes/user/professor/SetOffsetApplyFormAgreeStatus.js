var express = require('express');
var router = express.Router();
var query = require('../../../db/msql');
var csrf = require('csurf');
var csrfProtection = csrf();
var fs = require('fs');

router.post('/professor/SetOffsetApplyFormAgreeStatus', csrfProtection, function(req, res){
//router.get('/assistants/SetOffsetApplyFormAgreeStatus', function(req, res){

        if(req.session.profile){
            for(var i = 0; i < req.body.courses.length; i++){
                var data = {
                    timestamp: req.body.courses[i].timestamp,
                    student_id: req.body.courses[i].sid,
                    state: req.body.status, // 0:尚未決定, 1:助理同意, 2:主任同意, 3:主任不同意
                    reject_reason: req.body.courses[i].reason,
                    transferto:""
                }
                query.SetOffsetApplyFormAgreeStatus(data, function(err,result){
                    if(err){
                        throw err;
                        res.redirect('/');
                    }
                    if(!result)
                        res.redirect('/');
                });
                
            }
        	setTimeout(function(){
		        var signal = {signal :1};
		        res.send(signal);
	        },2000);
        }
        else
            res.redirect('/');
});

module.exports = router;

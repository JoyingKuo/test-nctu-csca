var express = require('express');
var router = express.Router();
var query = require('../../../db/msql');
var csrf = require('csurf');
var csrfProtection = csrf();
var fs = require('fs');

router.post('/assistants/SetOffsetApplyFormAgreeStatus', csrfProtection, function(req, res){

        if(req.session.profile){
            var data = {
                student_id: req.body.sid,
                cos_cname_old: req.body.cosname,
                cos_code_old: req.body.coscode,
                person: '', //T:系主任, A:助理
                state: req.body.status // 0:尚未決定, 1:助理同意, 2:主任同意, 3:主任不同意
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
        else
            res.redirect('/');
});

module.exports = router;

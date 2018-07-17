var express = require('express');
var router = express.Router();
var query = require('../../../db/msql');
var getStudentId = require('../course/getStudentId');
var fs = require('fs');
var csrf = require('csurf');
var csrfProtection = csrf();
var StudentId = getStudentId.getStudentId.studentId;

router.get('/students/mentorInfo', StudentId,function(req, res){

    if(req.session.profile){
		
        var info;
        var IDlist;
		var studentId = res.locals.studentId;
		//console.log(studentId);
        query.mentorReturn(studentId, function(err, result){
            if(err){
                throw err;
                res.redirect('/');
            }
            if(!result)
                res.redirect('/');
            result = JSON.parse(result);
			res.send(result);
			
        });
     }
     else
        res.redirect('/');

});

module.exports = router;

var express = require('express');
var router = express.Router();
var query = require('../../../db/msql');
var getStudentId = require('../course/getStudentId');

var StudentId = getStudentId.getStudentId.studentId;
router.get('/students/courseMap',StudentId, function(req, res){

    if(req.session.profile){
        var studentId = res.locals.studentId;
        query.ShowCosMapRule(studentId, function(err,result){
            if(err){
                
                throw err;
                res.redirect('/');
            }
            if(!result){
                res.redirect('/');
            }
	    res.send(result);
        });
    }
    else
      res.redirect('/');

});

module.exports = router;


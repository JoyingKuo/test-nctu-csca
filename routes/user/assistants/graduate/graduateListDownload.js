var express = require('express');
var router = express.Router();
var query = require('../../../../db/msql');
var fs = require('fs');
var getStudentId = require('../../course/getStudentId');
var StudentId = getStudentId.getStudentId.studentId;
var Json2csvParser = require('json2csv').Parser;
var csrf = require('csurf');
var csrfProtection = csrf();

router.post('/assistants/graduate/graduateListDownload' ,csrfProtection ,function(req, res){

    if(req.session.profile){ 
        var graduateList = [];
        //req.body.grade = '四';
        var grade = { grade: req.body.grade};
        query.ShowGivenGradeStudentID(grade, function(error,studentList){
            if(error) {
				throw error;
				res.redirect('/');
			}
			if(!studentList)
				 res.redirect('/');
            studentList = JSON.parse(studentList);
            for (var i=0 ; i < studentList.length ; i++){
                var student_id = { student_id: studentList[i].student_id};
                query.ShowStudentGraduate(student_id, function(err,result){	
			        if(err) {
				        throw err;
				        res.redirect('/');
			        }
			        if(!result)
				        res.redirect('/');
                    result = JSON.parse(result);
                    graduateList.push(result);
    	        });	

            }
		    
        });

        setTimeout(function(){
            res.send(graduateList);    
        },1000);
           
		
    }
	else
        res.redirect('/');

});

module.exports = router;

var express = require('express');
var router = express.Router();
var query = require('../../../../db/msql');
var csrf = require('csurf');
var csrfProtection = csrf();

router.post('/professors/students/StudentInfo',csrfProtection, function(req, res){

    if(req.session.profile){
    
		query.ShowUserInfo(req.body.student_id, function(err,profile){
			if(err){
				throw err;
				return;
			}
			if(!profile){
				return;
			}
			else{
				profile = JSON.parse(profile);
				profile ={
					//student_id: profile[0].student_id,
					sname: profile[0].sname,
					program: profile[0].program,
					graduate: profile[0].graduate,
					graduate_submit: profile[0].graduate_submit,
					email: profile[0].email,
                    //recent_failed:(profile[0].recent_failed =="true")?true:false,
					//failed:(profile[0].failed =="failed")?true:false
				}
				res.send(profile);
			}
				
		});
	
    }
    else
        res.redirect('/');

});

module.exports = router;

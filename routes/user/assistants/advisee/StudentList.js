var express = require('express');
var router = express.Router();
var query = require('../../../../db/msql');
var csrf = require('csurf');
var csrfProtection = csrf();

//router.get('/assistants/advisee/StudentList', function(req, res){
router.post('/assistants/advisee/StudentList', csrfProtection, function(req, res){

    if(req.session.profile){
    
        var teacherId = req.body.teacher_id;
        query.ShowTeacherMentors(teacherId, function(err, result){
            if(err){
                throw err;
                res.redirect('/');
            }
            if(!result)
                res.redirect('/');
			else{
				var info = [];
				result = JSON.parse(result);
				//res.send(result);
				for(var i=0;i<result.length;i++){
					query.ShowUserInfo(result[i].student_id, function(err,profile){
						if(err){
							throw err;
							res.redirect('/');
						}
						if(!profile){
							res.redirect('/');
						}
						else{
							profile = JSON.parse(profile);
							profile ={
								student_id: profile[0].student_id,
								sname: profile[0].sname,
								program: profile[0].program,
								graduate: profile[0].graduate,
								graduate_submit: profile[0].graduate_submit,
								email: profile[0].email,
                                recent_failed: (profile[0].recent_failed == "true")?true:false,
								failed:(profile[0].failed =="failed")?true:false
							}
							info.push(profile);
						}
						if(info.length == result.length)
							res.send(info);
					});
	
				}
				
				
			}
            

        });
    }
    else
        res.redirect('/');

});

module.exports = router;

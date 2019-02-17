var express = require('express');
var router = express.Router();
var query = require('../../../../db/msql');

router.get('/assistants/advisee/TeacherList', function(req, res){

    if(req.session.profile){
		
        query.ShowTeacherIdList(function(err, result){
            if(err){
                throw err;
                res.redirect('/');
            }
            if(!result)
                res.redirect('/');
			else{
				result = JSON.parse(result);
				var list =[];
				for(var i=0;i<result.length;i++){
					var info ={
						id : result[i].teacher_id,
						name : result[i].tname,
                        status: 0,
						email : result[i].email,
						all_students : parseInt(result[i].all_students),
						recent_failed : parseInt(result[i].recent_failed),
                        failed_students : parseInt(result[i].failed_students)
					}
                    if(info.id == "T9303" )
                        info.status = 1;
					list.push(info);
				}
				if(list.length == result.length)
					res.send(list);
			}
        });
    }
    else
        res.redirect('/');

});

module.exports = router;

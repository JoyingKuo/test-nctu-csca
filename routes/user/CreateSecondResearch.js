var express = require('express');
var router = express.Router();
var query = require('../../db/msql');


router.get('/CreateSecondResearch', function(req, res){
	if(req.session.profile){
	 	var input = {first_second:1, semester:'106-2'};
	 	query.ShowStudentResearchList(input, function(err, result){
	 		if(err){
				throw err;
				res.redirect('/');
			}
			if(!result)
				res.redirect('/');
			else{
				result = JSON.parse(result);
                for(var i = 0; i< result.length;i++){
                    var info={ student_id: result[i].student_id, tname: result[i].tname, research_title: result[i].research_title,first_second:2,semester:'107-1'}              
                    query.CreateNewResearch(info);
                }
                setTimeout(function(){
                    var signal = {signal: 1};
                   res.send(signal);

                     },1000);
			}
	 	});
	}
	else
        res.redirect('/');
});

module.exports = router;

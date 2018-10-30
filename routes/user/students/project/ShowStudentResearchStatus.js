var express = require('express');
var router = express.Router();
var query = require('../../../../db/msql');
var csrf = require('csurf');
var csrfProtection = csrf();

router.post('/students/project/ShowStudentResearchStatus',csrfProtection, function(req, res){

    if(req.session.profile){ 
	//	var participants = ["0416004","0416008","0416010"];
		var group =[];
		for(var i = 0;i< req.body.participants.length; i++){
			query.ShowStudentResearchStatus(req.body.participants[i], function(err,result){	
				if(err)
				{
					throw err;
					res.redirect('/');
				}
				if(!result)
					res.redirect('/');		
				result = JSON.parse(result);				
				group =[...group, ...result];
						
			});	
		}
		
		setTimeout(function(){
			res.send(group);
		},200);
		
    }
	else
       res.redirect('/');

});

module.exports = router;

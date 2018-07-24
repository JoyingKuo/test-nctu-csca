var express = require('express');
var router = express.Router();
var query = require('../../../../db/msql');
var csrf = require('csurf');
var csrfProtection = csrf();


router.get('/professors/students/researchInfo'/*,csrfProtection*/, function(req, res){

    if(req.session.profile){ 
      

		var Info = {research_title : '車載專題', tname : '曾煜棋', first_second : '1', semester:'106-2'};
		query.ShowResearchInfo(Info, function(err,result){
	
			if(err)
			{
				throw err;
				res.redirect('/');
			}
			if(!result)
				res.redirect('/');
			
			result = JSON.parse(result);
			//console.log(result.length);
			res.send(result);
		
					
		});		
		
    }
	else
        res.redirect('/');

});

module.exports = router;

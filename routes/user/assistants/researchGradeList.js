var express = require('express');
var router = express.Router();
var query = require('../../../db/msql');
var csrf = require('csurf');
var csrfProtection = csrf();
var fs = require('fs');

router.get('/assistants/researchGradeList'/*,csrfProtection*/, function(req, res){

 //   if(req.session.profile){ 
                var input = {semester: '106-2', first_second: '1'};
		query.showResearchGradeComment(input, function(err,result){	
			if(err)
			{
				throw err;
				res.redirect('/');
			}
			if(!result)
				res.redirect('/');
		
        //	var json = JSON.stringify(result);
           fs.writeFile('score.json',result, function(err){
            if (err) 
                console.log(err);
             console.log('videoLinks.json saved');
              })
           // fs.writeFile('myjsonfile.json', json, 'utf8', callback);
			result = JSON.parse(result);
		   
			res.send(result);
		
					
		});	
		
   // }
//	else
  //      res.redirect('/');

});

module.exports = router;

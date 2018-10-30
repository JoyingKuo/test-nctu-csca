var express = require('express');
var router = express.Router();
var query = require('../../../../db/msql');
var csrf = require('csurf');
var csrfProtection = csrf();

router.post('/students/graduate/reset',csrfProtection, function(req, res){
	if(req.session.profile){
	 	var input = req.body.student_id;
	 	query.DeleteCosMotion(input);
	}
	else
        res.redirect('/');
});

module.exports = router;


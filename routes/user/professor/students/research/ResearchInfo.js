var express = require('express');
var router = express.Router();
var query = require('../../../course/query');
var csrf = require('csurf');
var csrfProtection = csrf();

var queryResearchIntro = query.query.queryResearchIntro;
router.post('/professors/students/researchInfo',csrfProtection, queryResearchIntro, function(req, res){
	res.send(req.intro);
});

module.exports = router;

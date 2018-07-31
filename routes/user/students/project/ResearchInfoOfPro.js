var express = require('express');
var router = express.Router();
var query = require('../../course/query');
var csrf = require('csurf');
var csrfProtection = csrf();

var queryTotalProjects = query.query.queryTotalProjects;
router.post('/students/project/ResearchInfoOfPro',csrfProtection, queryTotalProjects, function(req, res){
	res.send(req.projects);
});

module.exports = router;

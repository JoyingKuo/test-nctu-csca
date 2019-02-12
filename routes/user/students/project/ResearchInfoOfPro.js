var express = require('express');
var router = express.Router();
var query = require('../../course/query');
var csrf = require('csurf');
var csrfProtection = csrf();

var queryTeacherPastProject = query.query.queryTeacherPastProject;
router.post('/students/project/ResearchInfoOfPro',csrfProtection, queryTeacherPastProject, function(req, res){
	res.send(req.projects);
});

module.exports = router;

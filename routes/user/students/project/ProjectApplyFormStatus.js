var express = require('express');
var router = express.Router();
var query = require('../../course/query');
var getStudentId = require('../../course/getStudentId');


var StudentId = getStudentId.getStudentId.studentId;
var queryApplyFormAndProject = query.query.queryApplyFormAndProject;
router.get('/students/projectPage', StudentId, queryApplyFormAndProject, function(req, res){
 //   	console.log(req.form);
	res.send(req.form);
});

module.exports = router;

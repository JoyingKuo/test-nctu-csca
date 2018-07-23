var express = require('express');
var router = express.Router();
var fs = require('fs');
var getStudentId = require('../../course/getStudentId');
var query = require('../../course/query');

var StudentId = getStudentId.getStudentId.studentId;
var queryProInfoAndResearchCount = query.query.queryProInfoAndResearchCount;
router.get('/students/ProInfo', StudentId, queryProInfoAndResearchCount, function(req, res){
	
	res.send(req.info);
});

module.exports = router;

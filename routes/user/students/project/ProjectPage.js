var express = require('express');
var apps = express();
var router = express.Router();
var getStudentId = require('../../course/getStudentId');
var query = require('../../course/query');

var StudentId = getStudentId.getStudentId.studentId;
var queryProject = query.query.queryProject;

router.post('/students/projectPage', StudentId, queryProject, function(req, res){
 
    res.send(req.project);
});

module.exports = router;


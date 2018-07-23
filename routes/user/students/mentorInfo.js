var express = require('express');
var router = express.Router();
var query = require('../course/query');
var getStudentId = require('../course/getStudentId');
var fs = require('fs');

var StudentId = getStudentId.getStudentId.studentId;
var queryMentorInfo = query.query.queryMentorInfo;
router.get('/students/mentorInfo', StudentId, queryMentorInfo, function(req, res){

    res.send(req.info);
});

module.exports = router;

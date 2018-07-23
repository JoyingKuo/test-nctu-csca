var express = require('express');
var router = express.Router();
var query = require('../../../course/query');
var getTeacherId = require('../../../course/getTeacherId');

var TeacherId = getTeacherId.getTeacherId.teacherId;
var queryProjectList = query.query.queryProjectList;
router.get('/professors/students/projects', TeacherId, queryProjectList, function(req, res){

    res.send(req.projects);
});

module.exports = router;

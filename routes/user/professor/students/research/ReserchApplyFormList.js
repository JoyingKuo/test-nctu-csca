var express = require('express');
var router = express.Router();
var query = require('../../../course/query');
var getTeacherId = require('../../../course/getTeacherId');

var TeacherId = getTeacherId.getTeacherId.teacherId;
var queryProjectApplyList = query.query.queryProjectApplyList;
router.get('/professors/students/applyList', TeacherId, queryProjectApplyList, function(req, res){

	res.send(req.groups);
});

module.exports = router;

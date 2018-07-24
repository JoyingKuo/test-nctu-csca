var express = require('express');
var router = express.Router();
var query = require('../../course/query');
var getStudentId = require('../../course/getStudentId');
var csrf = require('csurf');
var csrfProtection = csrf();

var StudentId = getStudentId.getStudentId.studentId;
var queryApplyFormAndProject = query.query.queryApplyFormAndProject;
router.post('/students/applyState', csrfProtection, StudentId, queryApplyFormAndProject, function(req, res){
    res.send(req.form);
});

module.exports = router;

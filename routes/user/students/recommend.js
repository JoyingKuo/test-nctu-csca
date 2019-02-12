var express = require('express');
var apps = express();
var utils = require('../../../../../utils');
var router = express.Router();
var getStudentId = require('../../../course/getStudentId');
var query = require('../../../course/query');
var other = require('../../../course/revise/Othercourse');
var cs = require('../../../course/revise/CScourse');
var result = require('../../../course/courseResult');
var nowOther = require('../../../course/current/currentOther');
var nowCS = require('../../../course/current/currentCS');
var restore = require('../../../course/revise/restore');
var m = require('../../../../../db/msql.js');

var StudentId = getStudentId.getStudentId.studentId;

router.post('/students/recommend', StudentId, StudentProfile, queryFree, queryGeneral, queryPass, queryChange, queryCourse, queryNow,queryRule, processOther, processCS, currentOther, currentCS,  processRestore, processResult, function(req, res) {

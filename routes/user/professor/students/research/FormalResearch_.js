var express = require('express');
var apps = express();
var router = express.Router();
var m = require('../../../../../db/msql.js');
var query = require('../../../course/query');
var getTeacherId = require('../../../course/getTeacherId');
var utils = require('../../../../../utils');
var TeacherId = getTeacherId.getTeacherId.teacherId;
var queryProjectList = query.query.queryProjectList;

router.post('/professors/students/projects', TeacherId, queryProjectList, function(req, res){
    if (req.session.profile) {
        var teacher_id = res.locals.teacherId;
        /*m.ShowResearchTitleNumber({tname:'彭文志', research_title:'聊天機器人', semester:'106-2'}, function(err, result) {
            if (err)
                throw err;
            res.send(JSON.parse(result)[0].count);
        });*/
        var projects = req.projects;
        m.ShowUserInfo(teacher_id, function(err, result) {
            if (err)
                throw err;
            else {
                var result = JSON.parse(result);
                var tname = result[0].tname;
                var get_number = function(callback) {
                    for (var i = 0; i < projects.groups.length; i++) {
                        var group = {
                            research_title: projects.groups[i].research_title,
                            participants: projects.groups[i].participants,
                            year: projects.groups[i].year,
                            first_second: projects.groups[i].first_second,
                            title_number: ''
                        };
                        m.ShowResearchTitleNumber({tname: tname, research_title: group.research_title, semester: group.year}, function(err, result) {
                            if (err)
                                throw err;
                            else {
                                group.title_number = JSON.parse(result)[0].count;
                                projects.groups[i] = group;
                            }
                        });
                    }
                }
                get_number(setTimeout(function() {
                            res.send(projects);
                        }), 1000);
            }
        });
    } else {
        res.redirect('/');
    }
});

module.exports = router;

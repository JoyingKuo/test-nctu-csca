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
        var projects = req.projects;
        var group_list_1 = [];
        var group_list_2 = [];
        var group_len = projects.groups.length;
        var tname = "";
        m.ShowUserInfo(teacher_id, function(err, result) {
            if (err)
                throw err;
            else {
                result = JSON.parse(result);
                tname = result[0].tname;
                for (let i = 0; i < group_len; i++) {
                    var group = {
                        research_title: projects.groups[i].research_title,
                        participants: projects.groups[i].participants,
                        year: projects.groups[i].year,
                        first_second: projects.groups[i].first_second,
                        title_number: ''
                    };
                    group_list_1.push(group);
                }
                if(group_list_1.length === group_len){
                    for(let i = 0; i < group_len; i++){
                        m.ShowResearchTitleNumber({tname: tname, research_title: group_list_1[i].research_title, semester: group_list_1[i].year}, function(error, results) {
                            if (error)
                                throw error;
                            else {
                                results = JSON.parse(results);
                                group_list_1[i].title_number = results[0].count-1;
                                console.log(results[0].count);
                                group_list_2.push(group_list_1[i]);
                                if(group_list_2.length === group_len){
                                    projects.groups = group_list_2;
                                    res.send(projects);
                                }
                            }
                        });
                    }
                }
            }
        });
    } else {
        res.redirect('/');
    }
});

module.exports = router;

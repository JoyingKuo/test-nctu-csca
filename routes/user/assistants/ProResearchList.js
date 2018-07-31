var express = require('express');
var router = express.Router();
//var query = require('../../course/query');
var query = require('../../../db/msql');
var csrf = require('csurf');
var csrfProtection = csrf();


router.get('/assistants/project/ProResearchList', function(req, res){
	query.ShowTeacherIdList(function(err, ID_list){
        if(err){
            throw err;
            res.redirect('/');
        }
        if(!ID_list)
            res.redirect('/');
		else{
			var group = [];
			var Count = 0;
			var Index = [];
			ID_list = JSON.parse(ID_list);
			for(var i=0; i<ID_list.length; i++){
				var list ={
					professor_name:ID_list[i].name,
					accepted:{
						projects:[]
					},
					pending:{
						projects:[]
					}
				}
				Index[ID_list[i].id] = Count;
				Count ++;
				group.push(list);
			}
			for(var i=0; i<ID_list.length; i++){
				query.ShowTeacherResearchStudent(ID_list[i].id, function(err, result){
					if(err){
						throw err;
						return;
					}
					if(!result)
						return;
					else{
						result = JSON.parse(result);
						var index = [];
						var count = 0;
						for(var i = 0; i<result.length; i++){
							
							if(index[result[i].research_title] == null){
								var project = {
										title: '',
										students : [],
										
								}
								project.title = result[i].research_title;
								var Id = Index[result[i].teacher_id];
								group[Id].accepted.projects.push(project);
								index[result[i].research_title] = count;
								count++;
							}  
						}
						for(var i = 0; i<result.length; i++){
							
							var student = {
								id: '',
								name: '',
								program: '',	
							}
							student.id = result[i].student_id;
							student.name = result[i].sname;
							student.program = result[i].class_detail;
							
							var id = index[result[i].research_title];
							var Id = Index[result[i].teacher_id];
							group[Id].accepted.projects[id].students.push(student);
									
						}
					}
				});
			}
			for(var i=0; i<ID_list.length; i++){
				
				query.ShowTeacherResearchApplyFormList(ID_list[i].id, function(err, result){
					if(err){
						throw err;
						return;
					}
					if(!result)
						return;
					else{
						
						result = JSON.parse(result);
						var index = [];
						var count = 0;
						for(var i = 0; i<result.length; i++){
							
							if(index[result[i].research_title] == null){
								var project = {
										title: '',
										students : [],
										
								}
								project.title = result[i].research_title;
								var Id = Index[result[i].teacher_id];
								group[Id].pending.projects.push(project);
								index[result[i].research_title] = count;
								count++;
							}  
						}
						for(var i = 0; i<result.length; i++){	
							var student = {
								id: '',
								name: '',
								program: '',	
							}
							student.id = result[i].student_id;
							student.name = result[i].sname;
							student.program = result[i].program;
							
							var id = index[result[i].research_title];
							var Id = Index[result[i].teacher_id];
							group[Id].pending.projects[id].students.push(student);
									
						}	
					}
				});
			}
			setTimeout(function(){
						res.send(group);
			},500);
		}
	});	
});

module.exports = router;


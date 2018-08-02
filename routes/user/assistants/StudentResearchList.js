var express = require('express');
var router = express.Router();
//var query = require('../../course/query');
var query = require('../../../db/msql');
var csrf = require('csurf');
var csrfProtection = csrf();


router.get('/assistants/project/StudentResearchList', function(req, res){
	query.ShowStudentIdList(function(err, ID_list){
        if(err){
            throw err;
            res.redirect('/');
        }
        if(!ID_list)
            res.redirect('/');
		else{
			var project = [];
			var count = 0;
			var index = [];
			
			ID_list = JSON.parse(ID_list);
			for(var i=0; i<ID_list.length; i++){
				
				var list ={
						student:{
							id:'',
							name:'',
							program:''
						},
						project:{
							status:2,
							title:'',
							professor_name:''
						}
					}
				list.student.id = ID_list[i].student_id;
				list.student.name = ID_list[i].sname;
				list.student.program = ID_list[i].program;
				index[ID_list[i].student_id] = count;
				
				count ++;
				project.push(list);
			
			}
				
			for(var i=0; i<ID_list.length; i++){
				
					query.ShowStudentResearchInfo(ID_list[i].student_id, function(err, research){
					if(err)
						throw err;
					if(!research)
						res.redirect('/');
						else{
							research = JSON.parse(research);
			
							if(research.length!=0){
								var id = index[research[0].student_id];
								project[id].project.status = 0;
								project[id].project.title = research[0].research_title;
								project[id].project.professor_name = research[0].tname;	
								
							}					
						}		
					});
				

			}
			for(var i=0; i<ID_list.length; i++){
				
				query.ShowStudentResearchApplyForm(ID_list[i].student_id,'1', function(err, applyform){
					if(err)
						throw err;
					if(!applyform)
						res.redirect('/');
					else{		
						applyform = JSON.parse(applyform);
						//console.log(applyform);
						if (applyform.length!=0){
							var id = index[applyform[0].student_id];
							
							if(applyform[0].agree == 0 || applyform[0].agree == 2)
								project[id].project.status = 1;
							//else if(applyform[0].agree == 3)
							//	project[id].project.status =2;
							
							project[id].project.title = applyform[0].research_title;
							project[id].project.professor_name = applyform[0].tname;
				
						}
					}
				});
				
			}
			setTimeout(function(){
						res.send(project);
			},500);
		}
	});	
});

module.exports = router;

var express = require('express');
var router = express.Router();
var query = require('../../../../db/msql');
var getStudentId = require('../../course/getStudentId');
var fs = require('fs');
var csrf = require('csurf');
var csrfProtection = csrf();
var StudentId = getStudentId.getStudentId.studentId;

router.get('/students/ProInfo', /*csrfProtection,*/StudentId, function(req, res){

    if(req.session.profile){
		
        var info;
        var IDlist;
		var studentId = res.locals.studentId;
        query.findTeacherResearchCountAndInfo(function(err, result){
            if(err){
                throw err;
                res.redirect('/');
            }
            if(!result)
                res.redirect('/');
            result = JSON.parse(result);
			var grade = studentId.substring(0,2);
			//console.log(grade);
			var project = []
			var flag;
			
			for(var i = 0; i < result.length; i++){
				for(var j = 0; j < result[i].gradeCnt.length; j++)
				{
					var pic_route = '/home/joying/db_data/photo/' + result[i].teacher_id + '.jpg';
					var pic_path = 'professor/'+ result[i].teacher_id + '.jpg';
					//console.log(pic_path);
					var path;
					try{
                            var stats = fs.statSync(pic_route);
							path = pic_path;
                        }
                        catch(err){
                            path = "";

                        }
					if(result[i].gradeCnt[j].grade == grade){
						
						project.push({ tname: result[i].tname,teacher_id: result[i].teacher_id, phone:result[i].phone, email: result[i].email, expertise: result[i].expertise, info : result[i].info, path : path, scount: result[i].gradeCnt[j].scount});
						flag =1;
						break;
					}						
					else
						flag = 0;
				}
				if (flag==0)
					project.push({ tname: result[i].tname,teacher_id:result[i].teacher_id, phone:result[i].phone, email: result[i].email, expertise: result[i].expertise, info : result[i].info, path : path, scount: "0" });
			
			}
			res.send(project);
			//console.log(info)
            /*query.returnTeacherIdList(function(err, IDlist){
                if(err){
                    throw err;
                    res.redirect('/');
                }
                if(!IDlist)
                    res.redirect('/');
                IDlist = JSON.parse(IDlist);
          
				var empty =0;
                for(var i = 0; i<IDlist.length; i++){
					
                    if(IDlist[i].teacher_id == teacherID){
                        var route = '/home/nctuca/db_data/photo/' + IDlist[i].teacher_id + '.jpg';
                        var path = 'professor/'+ IDlist[i].teacher_id + '.jpg';
                       

                        try{
                            var stats = fs.statSync(route);
                            info[0].photo = path;
                            res.send(info);
                        }
                        catch(err){
                            info[0].photo = "";
                            res.send(info);
                        }
						
                        break;
                    }					
                }
            });*/
        });
     }
     else
        res.redirect('/');

});

module.exports = router;

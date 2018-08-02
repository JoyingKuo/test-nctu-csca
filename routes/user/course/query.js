const request = require('request');
var table = require('./table');
var utils = require('../../../utils');
var query = {};
//query students' profile
query.queryProfile = function(req, res, next){
    if(req.session.profile && res.locals.studentId){
        var studentId = res.locals.studentId;
        if(!studentId){
            //console.log("No student Id");
            return;
        }
        else{
            table.tables.getProfile(studentId,function(profile){
                req.profile = profile;
                if(req.profile)
                    next();
                else{
                    //console.log("Cannot get profile");
                    return;   
                } 
            });
        }
    }
}
//query students' pass course
query.queryPass = function(req, res, next){
   if(req.session.profile && res.locals.studentId){
	 var studentId = res.locals.studentId;
         if(!studentId){
         	    //console.log("No Student Id in queryPass");
                return;
         }
         else{
           	table.tables.getPass(studentId,function(pass){
                req.pass = pass;
		        if(req.pass)
                  next();
                else{
                  //console.log("Cannot get pass");
                  return;
                }
            });
         }
    }
    else {
        res.redirect('/');
    }
}
//query course in cs table
query.queryCourse = function(req, res, next){
    if(req.session.profile && res.locals.studentId){
    	var studentId = res.locals.studentId;
  		if(!studentId){
  			//console.log("No Student Id in queryCourse");
  			return;
  	  	}
      		else{
        		table.tables.getCourse(studentId, function(course){
          			req.course = course;
	  			if(req.course)
            				next();
          			else{
              				//console.log("Cannot get course");
              				return;
          			}
        		});
      		}
    }
    else {
      		res.redirect('/');
    }
}
//query curricular rules
query.queryRule = function(req, res, next){
    if(req.session.profile && res.locals.studentId){
         var studentId = res.locals.studentId;
                if(!studentId){
                        //console.log("No Student Id in queryRule");
                        return;
                }
                else{
                     table.tables.getRule(studentId,function(rules){
                          req.rules = rules;
			  if(req.rules)
                             next();
                          else{
                             //console.log("Cannot get rules");
                             return;
                          }
                     });
                }
     }
     else{
       res.redirect('/');
     }
}
//query courses that students' want to waive
query.queryFree = function(req, res, next){
    if(req.session.profile){
         var studentId = res.locals.studentId; 
                if(!studentId){
                        //console.log("No Student Id in queryFree");
                        return;
                }
                else{     
		                table.tables.getFree(studentId,function(free){
                                req.free = free;
                                if(req.free)
                                        next();
                                else{
                                        //////console.log("Cannot get free course");
                                        return;
                                }
                        });
                }
     }
     else{
       res.redirect('/');
     }
}
//query courses that students take this semester
query.queryNow = function(req, res, next){
    if(req.session.profile){
         var studentId = res.locals.studentId;
                if(!studentId){
                        //console.log("No Student Id in queryNow");
                        return;
                }
                else{
                     table.tables.getNow(studentId,function(now){
                          req.now = now;
                          if(req.now)
                             next();
                          else{
                             //console.log("Cannot get current course");
                             return;
                          }
                     });
                }
     }
     else{
       res.redirect('/');
     }
}
//query courses that could be taken as general courses
query.queryGeneral = function(req, res, next){
    if(req.session.profile){
    	table.tables.getGeneral(function(general){
        	req.general = general;
                if(req.general)
                	next();
                else{
                        //console.log("Cannot get general courses");
                        return;
                }
        });
     }
     else{
       res.redirect('/');
     }
}
//query courses that are changed by students
query.queryChange = function(req, res, next){
    if(req.session.profile){
        var studentId = res.locals.studentId;
        table.tables.getChange(studentId, function(change){
            req.changeCourses = change;
            if(req.changeCourses)
                next();
            else{
                //console.log("Cannot get changed courses");
                return;
            }
        });
    }
    else
        res.redirect('/');
}
//query the project the student do
query.queryProject = function(req, res, next){
    if(req.session.profile){
        var studentId = res.locals.studentId;
        table.tables.getProject(studentId, function(project){
            req.project = project;
            if(req.project)
                next();
            else
                return;
        });
    }
    else
        res.redirect('/');
}

//query the professor information and the research count of current year
query.queryProInfoAndResearchCount = function(req, res, next){
    if(req.session.profile){
		var studentId = res.locals.studentId;
        table.tables.getProInfoAndResearchCount(studentId, function(info){
			req.info = info;
            if(req.info)
                next();
            else
                return;
        });
    }
    else
        res.redirect('/');
}

//query the professor information and the research count of current year
query.CheckStateAndCreateNewForm = function(req, res, next){
    if(req.session.profile){
		var info = req.body;
		//console.log(info);
        table.tables.getCheckStateAndCreateNewForm(info, function(signal){
			req.signal = signal;
            if(req.signal)
                next();
            else
                return;
        });
    }
    else
        res.redirect('/');
}
// query the project apply form the student have (to know state)
query.queryApplyFormAndProject = function(req, res, next){
    if(req.session.profile){
		var studentId = res.locals.studentId;
		
        table.tables.getApplyFormAndProject(studentId, function(form){
			req.form = form;
            if(req.form)
                next();
            else
                return;
        });
    }
    else
        res.redirect('/');
}

// delete the project apply form
query.PerformDelete = function(req, res, next){
    if(req.session.profile){
		var info = req.body;
        table.tables.DeleteForm(info, function(signal){
			req.signal = signal;
            if(req.signal)
                next();
            else
                return;
        });
    }
    else
        res.redirect('/');
}

// edit the project page information
query.PerformEditProjectPage = function(req, res, next){
    if(req.session.profile){
		var info = req.body;
        table.tables.EditProjectPage(info, function(signal){
			req.signal = signal;
            		console.log(req.signal);
		if(req.signal)
                next();
            else
                return;
        });
    }
    else
        res.redirect('/');
}

// query the mentor of specific student
query.queryMentorInfo = function(req, res, next){
    if(req.session.profile){
		var studentId = res.locals.studentId;
        table.tables.getMentorInfo(studentId, function(info){
		req.info = info;
        if(req.info)
            next();
        else
            return;
        });
    }
    else
        res.redirect('/');
}

// set the project score
query.SetProjectScore = function(req, res, next){
    if(req.session.profile){
		var info = req.body;
        table.tables.setScore(info, function(signal){
		req.signal = signal;
        if(req.signal)
            next();
        else
            return;
        });
    }
    else
        res.redirect('/');
}
// set the project title
query.SetProjectTitle = function(req, res, next){
    if(req.session.profile){
		var info = req.body;
        table.tables.setTitle(info, function(signal){
		req.signal = signal;
        if(req.signal)
            next();
        else
            return;
        });
    }
    else
        res.redirect('/');
}
// query the project apply list the teacher have
query.queryProjectApplyList = function(req, res, next){
    if(req.session.profile){
		var teacherId = res.locals.teacherId;
        table.tables.getProjectApplyList(teacherId, function(groups){
		req.groups = groups;
        if(req.groups)
            next();
        else
            return;
        });
    }
    else
        res.redirect('/');
}
// query the formal project list the teacher have
query.queryProjectList = function(req, res, next){
    if(req.session.profile){
		var teacherId = res.locals.teacherId;
		
        table.tables.getProjectList(teacherId, function(projects){
		req.projects = projects;
        if(req.projects)
            next();
        else
            return;
        });
    }
    else
        res.redirect('/');
}
// accept/consider/reject the project apply
query.SetApplyFormState = function(req, res, next){
    if(req.session.profile){
		var info = req.body;
        table.tables.SetState(info, function(signal){
		req.signal = signal;
        if(req.signal)
            next();
        else
            return;
        });
    }
    else
        res.redirect('/');
}
// accept/consider/reject the project apply
query.queryResearchIntro = function(req, res, next){
    if(req.session.profile){
		var info = req.body;
        table.tables.getResearchIntro(info, function(intro){
		req.intro = intro;
        if(req.intro)
            next();
        else
            return;
        });
    }
    else
        res.redirect('/');
}
// query the project list of specificthe student want to see
query.queryTotalProjects = function(req, res, next){
    if(req.session.profile){
        table.tables.getProjectList(req.body.teacher_id, function(projects){
        req.projects = projects;
        if(req.projects)
            next();
        else
            return;
        });
    }
    else
        res.redirect('/');
}

exports.query = query;

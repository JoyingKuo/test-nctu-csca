const request = require('request');
var query = require('../../../db/msql');
var utils = require('../../../utils');
var fs = require('fs');
var nodemailer = require('nodemailer');
//資電A 資工B 網多C
var table = {};

function queryProfile(studentId, callback){
    query.ShowUserInfo(studentId, function(err, profile){
        if(!profile){
            //console.log("Can't find the student");
            return;
        }
        if(err){
            throw err;
            return;
        }
        else
            callback(profile);
    });
}

function queryPass(studentId, callback){
	query.ShowUserAllScore(studentId, function(err, pass){
		if(!pass){
			////console.log("Can't find the student.");
			return;
		}
		if(err){
			throw err;
			return;
		}
		else{

           // console.log(pass);
			callback(pass);
        }
	});
}

function queryRule(studentId, callback){
	query.ShowGraduateRule(studentId, function(err, rules){
		if(!rules){
			////console.log("Can't find the student.");
			return;
		}
		if(err){
			throw err;
			return;
		}
		else
			callback(rules);
	});

}

function queryCourse(studentId,professional_field, callback){
    var info = {
            group: '',
            program: '',
            professional_field: professional_field,
            studentId: studentId
    };
    query.ShowCosGroup(studentId, function(err, result){
			if(!result){
				////console.log("Cannot find the student.");
				return;
			}
			if(err){
				throw err;
				return;
			}
            else{
            	info.group = result;
                let s_info = {id: studentId, graduate_submit:4,submit_type:2, net_media:professional_field};
                query.SetGraduateSubmitStatus(s_info,function(err,result){
                    if(err){
                        throw err
                        return;
                    }
                    if(!result)
                        return;
                    else{
                        query.ShowUserInfo(studentId, function(err,result){
		                    if(err){
				                throw err;
		            	        return;
		                    }
		                    if(!result){
		                        return;
                            }
        		            result = JSON.parse(result);

		                    info.program = result[0].program;
                            info.professional_field = parseInt(result[0].net_media);
                            processCourse(info, function(course){		
                        	    callback(course);
                    		});

	                    });
                        
                    }   
                });
            }
        });
	
}

function processCourse(info, callback){
         
	var program = info.program.substring(0,2);
    var result = info.group;
	var course = {
                program : program,
                professional_field: info.professional_field,
                compulse: [],
                core: [],
                vice:[],
                others: [],
                elective:[],
		        total:[]
        }
	result = JSON.parse(result);
	course.total = result;
	if(program == '資電' ){
		for(var i = 0; i < result.length; i++){
			switch(result[i].type){
				case '必修' :
					course.compulse.push(result[i]);
					break;  
				case '核心' :
					course.core.push(result[i]);
					break;  
				case '副核心' :
					course.vice.push(result[i]);
					break;  
				case '網多核心': case '資工核心' :
					course.others.push(result[i]);
					break;  
			} 
		 }
                //console.log(course);
                callback(course);
	}
	else if(program == '資工'){
		for(var i = 0; i < result.length; i++){

			switch(result[i].type){
				case '必修' :
					course.compulse.push(result[i]);
					break;  
				case '核心' :
					course.core.push(result[i]);
					break;  
				case '副核心' :
					course.vice.push(result[i]);
					break;  
				case '資電核心': case '網多核心' :
					course.others.push(result[i]);
					break;  
			} 

		}
                callback(course);
	}
	else if(program == '網多'){
       
		for(var i = 0; i < result.length; i++){
		
			switch(result[i].type){
                case '必修' : 					
                    course.compulse.push(result[i]);
					break;
				case '核心' :
					course.core.push(result[i]);
					break;
				case '副核心' :
					course.vice.push(result[i]);
					break;
				case '資電核心': case '資工核心' :
					course.others.push(result[i]);
					break;

			}
    
            if(result[i].type == '網路' && info.professional_field == 0)
                course.compulse.push(result[i]);
            else if(result[i].type == '多媒體' && info.professional_field == 1)
                course.compulse.push(result[i]);
        }      
                callback(course);
	}

}

function queryList(studentId, callback){
	query.ShowGraduateStudentList(studentId, function(err, list){
                if(!list){
                        //console.log("Can't find the student.");
                        return;
                }
                if(err){
                        throw err;
                        return;
                }
                else
                        callback(list);
        });
}

function queryFree(studentId, callback){
	query.ShowUserOffset(studentId, function(err, free){
		if(!free){
			////console.log("Can't find free course list");
			return;
		}
		if(err){
			throw err;
			return;
		}
		else
			callback(free);
	});
}

function queryNow(studentId, callback){
	query.ShowUserOnCos(studentId, function(err, now){
		if(!now){
			////console.log("Can't find now course");
			return;
		}
		if(err){
			throw err;
			return;
		}
		else
			callback(now);
	});
}

function queryGeneral(studentId, callback){
	//*general cos rule*/
	query.ShowCosMotionLocate(studentId, function(err, general){
		if(!general){
			return;
		}
		if(err){
			throw err;
			return;
		}
		else
			callback(general);
	});
}

function queryChange(studentId, callback){
    query.ShowCosMotionLocate(studentId, function(err, change){
        if(!change){
            //console.log(" No change");
            return;
        }
        if(err){
            throw err;
            return;
        }
        //console.log(change);
        else
            callback(change);
    });
}

function queryProject(studentId, callback){
    query.ShowStudentResearchInfo(studentId, function(err, project){
        if(!project)
            return;
        if(err){
            throw err;
            return;
        }
        else{
			project = JSON.parse(project);
			//console.log(project);
			callback(project);
		}
            
    });
}
function queryApplyFormAndProject(studentId ,callback){			
			query.ShowStudentResearchApplyForm(studentId, function(err, form){
				if(!form)
					return;
				if(err){
					throw err;
					return;
				}
				else{
					form = JSON.parse(form);
					queryProject(studentId,function(project){
						var allForm = [...project,...form];
						//console.log(allForm);
						callback(allForm);
					});
					
					
				}
			});
		
            
	
}
function queryProInfoAndResearchCount(studentId, callback){	
    var info;
    var IDlist;
    query.ShowTeacherInfoResearchCnt(function(err, result){
        if(err){
            throw err;
            return;
        }
        if(!result)
            return;
        result = JSON.parse(result);
		var grade = studentId.substring(0,2);
		var info = [];
		var flag;
		for(var i = 0; i < result.length; i++){
			for(var j = 0; j < result[i].gradeCnt.length; j++){
				var pic_route = '/home/joying/db_data/photo/' + result[i].teacher_id + '.jpg';
				var pic_path = 'professor/'+ result[i].teacher_id + '.jpg';
				
				var path;
				try{
						var stats = fs.statSync(pic_route);
						path = pic_path;
                    }
                    catch(err){
                        path = "";
                    }
				if(result[i].gradeCnt[j].grade == grade){
					info.push({ tname: result[i].tname,teacher_id: result[i].teacher_id, phone:result[i].phone, email: result[i].email, expertise: result[i].expertise, info : result[i].info, path : path, scount: result[i].gradeCnt[j].scount});
					flag =1;
					break;
				}						
				else
					flag = 0;
			}
			if (flag==0)
				info.push({ tname: result[i].tname,teacher_id:result[i].teacher_id, phone:result[i].phone, email: result[i].email, expertise: result[i].expertise, info : result[i].info, path : path, scount: "0" });
		}
		callback(info);

    });

}
function CheckStateAndCreateNewForm(info ,callback){
		for(var i = 0;i< info.student_num; i++){
			var Student_info = {phone : info.phones[i], student_id : info.participants[i], research_title : info.research_title, tname : info.tname,first_second : info.first_second[i], email : info.email[i], semester: info.semester};
			CreateNewForm(Student_info);	
		}
		setTimeout(function(){
			var mailString= '';
			var nameString='';
			for(var j = 0; j< info.email.length; j++){
				mailString = mailString + info.email[j] + ',';
				nameString = nameString + info.participants[j] + ',';
			}
			var transporter = nodemailer.createTransport({
			service: 'Gmail',
			auth: {
				user: 'nctucsca@gmail.com',
				pass: 'axc3262757'
			}
			});
			
			var options = {
				//寄件者
				from: 'nctucsca@gmail.com',
				//收件者
				to: info.teacher_email, 
				//副本
				cc: /*req.body.sender_email*/mailString,
				//密件副本
				bcc: '',
				//主旨
				subject: '[交大資工線上助理]專題申請郵件通知', // Subject line
				//純文字
				/*text: 'Hello world2',*/ // plaintext body
				//嵌入 html 的內文
				html: '<p>此信件由系統自動發送，請勿直接回信！若有任何疑問，請直接聯絡 老師：'+info.teacher_email + ',學生：' + mailString +'謝謝。</p><br/><p>請進入交大資工線上助理核可申請表/確認申請表狀態：<a href = "https://csca.nctu.edu.tw"> 點此進入系統</a></p><br/><br/><p>Best Regards,</p><p>交大資工線上助理 NCTU CSCA</p>'
				//附件檔案
				/*attachments: [ {
					filename: 'text01.txt',
					content: '聯候家上去工的調她者壓工，我笑它外有現，血有到同，民由快的重觀在保導然安作但。護見中城備長結現給都看面家銷先然非會生東一無中；內他的下來最書的從人聲觀說的用去生我，生節他活古視心放十壓心急我我們朋吃，毒素一要溫市歷很爾的房用聽調就層樹院少了紀苦客查標地主務所轉，職計急印形。團著先參那害沒造下至算活現興質美是為使！色社影；得良灣......克卻人過朋天點招？不族落過空出著樣家男，去細大如心發有出離問歡馬找事'
				}]*/
			};
			
			transporter.sendMail(options, function(error, info){
				if(error){
					console.log(error);
				}
			});
			
			var signal = {signal :1};
			callback(signal);
		},1000);
}
function CreateNewForm(studentInfo){
	query.CreateResearchApplyForm(studentInfo, function(err){
		if(err){
			throw err;
			return;
		}
    });
}

function PerformDelete(info ,callback){
	var formInfo = {research_title : info.research_title, tname : info.tname, first_second:info.first_second, semester: info.semester};
	query.DeleteResearchApplyForm(formInfo);
		
	setTimeout(function(){
		var signal = {signal :1};
		callback(signal);
	},2000);
}
function PerformEditProjectPage(info ,callback){
	var set_project = {tname: info.tname, research_title : info.research_title, first_second:info.first_second,semester:info.semester,  new_title : info.research_title, new_link: null, new_intro:info.new_intro};
	//console.log(set_project);	
query.SetResearchInfo(set_project, function(err){
		if(err){
			throw err;
			return;
		}
		
	});
	 setTimeout(function(){
                var signal = {signal :1};
                callback(signal);
                        },500);

	
}
function queryMentorInfo(studentId ,callback){
	
    query.ShowStudentMentor(studentId, function(err, result){
		if(err){
			throw err;
			return;
		}
		if(!result)
			return;
		else{
			result = JSON.parse(result);
			callback(result);
		}
    });	
}
function SetProjectScore(info ,callback){
    var content = {student_id:info.student_id,tname:info.tname, research_title:info.research_title, first_second: info.first_second, semester: info.year, new_score:info.new_score, new_comment: info.comment};
    query.SetResearchScoreComment(content);
	
	setTimeout(function(){
			var signal = {signal :1};
			callback(signal);
	},1000);
}
function SetProjectTitle(info ,callback){
    var content = {research_title : info.research_title, tname : info.tname, first_second : info.first_second, semester:info.year, new_title : info.new_title};
	var num = query.SetResearchTitle(content);
	//console.log(content);	
	setTimeout(function(){
		var signal = {signal :1};
		callback(signal);
	},1000);
}
function queryProjectApplyList(teacherId ,callback){
	
    query.ShowTeacherResearchApplyFormList(teacherId, function(err,result){
		if(err) {
                  throw err;     
                  return;
            }

            if(!result)
                 return; 
			 
            result = JSON.parse(result);
			//console.log(result);
            if(result.length == 0){
                var groups = [];
            }
            else{
				var index = [];
				var groups = [];
				
				var count = 0;
				for(var i = 0; i<result.length; i++){
					if(index[result[i].research_title] == null){
						var project = {
							research_title: '',
							first_second:'',
							year: '',
							status:'',
							participants: []
						}
						project.research_title = result[i].research_title;
						project.first_second = result[i].first_second;
						project.year = result[i].semester;
						project.status = result[i].agree;
						if(result[i].agree != '3'){
							groups.push(project);
							index[result[i].research_title] = count;
							count++;
						}
							
					}  
				}
				for(var i = 0; i<result.length; i++){
					
					var student = {
						student_id: '',
						sname: '',
						email: '',
						phone: '',
						first_second:'',
						student_status:''
					}
					student.student_id = result[i].student_id;
					student.sname = result[i].sname;
					student.email = result[i].email;
					student.phone = result[i].phone;
					student.first_second = result[i].first_second;
					student.student_status = result[i].status;
					if(result[i].agree != '3'){
						var id = index[result[i].research_title];
						groups[id].participants.push(student);
					}			
				}
			}
			
	       callback(groups) ;   
    
    });	
}
function queryProjectList(info, callback){
    var teacherId = info.teacherId;
    var sem = info.sem;
	query.ShowGradeTeacherResearchStudent(teacherId,'', function(err, result){
            if(err){
                throw err;
                return;
            }
            if(!result)
                return;
			
            result = JSON.parse(result);
	   // console.log(result);		
            if(result.length == 0){
                var projects = {  
                 groups:[]
                }
            }
            else{
				var index = [];
				var temp = result[0].research_title;
				var projects = {
                    cs_number:0, //*
                    other_number:0, //*
					/*grade02:0,
					grade03:0,
					grade04:0,
					grade05:0,*/
					//total_number:0,
					groups: []
				}
				
				var count = 0;
	
				for(var i = 0; i<result.length; i++){
					//console.log(index[result[i].research_title]);
					if(index[result[i].research_title] == null){
                        if(result[i].semester != sem) continue;
						var project = {
								research_title: '',
								participants : [],
								year:'',
								first_second: '',
						}
						project.year = result[i].semester;
                        project.research_title = result[i].research_title;
						project.first_second = result[i].first_second;
						projects.groups.push(project);
						index[result[i].research_title] = count;
						count++;
					}  
				}
				var cs_number = 0, other_number = 0, cnt = 0;
				for(var i = 0; i<result.length; i++){
					if(result[i].semester != sem) continue;
					var student = {
						student_id: '',
						sname: '',
						detail: '',
						score: null
					}
					student.student_id = result[i].student_id;
					student.score = parseInt(result[i].score);
					/*var grade = student.student_id.substring(0,2);
					
					switch(grade){
						case '02':
							projects.grade02++;
							break;
						case '03':
							projects.grade03++;
							break;
						case '04':
							projects.grade04++;
							break;
						case '05':
							projects.grade05++;
							break;
					}*/
					student.sname = result[i].sname;
					student.detail = result[i].class_detail;
					var id = index[result[i].research_title];
					projects.groups[id].participants.push(student);
					//setTimeout(function(){	
					query.ShowStudentResearchInfo(student.student_id, function(error, res){
                        if(error){
                            throw error;
                            return;
                        }
                        if(!res){
                            return;
                        }
                        res = JSON.parse(res);
                        if(res[0].status == "1"){
                            cs_number++;
                        }
                        else{
                            other_number++;
                        }
                        //cnt++;
                    });
                    //},1000);
				}
                /*setTimeout(function(){
                query.ShowStudentResearchInfo("0512204", function(error, res){
                    if(error){
                        throw error;
                        return;
                    }
                    if(!res){
                        return;
                    }
                    res = JSON.parse(res);
                    if(res.status == "1"){
                        cs_number++;
                    }
                    else{
                        other_number++;
                    }
                    cnt++;
                    console.log(cnt);
                });    
                },1000);*/

                //project.cs_number = cs_number;
                //projects.other_number = other_number;
                //projects.total_number = projects.grade04;
           }
           setTimeout(function(){
               //if(cnt == 1){
                   projects.cs_number = cs_number;
                   projects.other_number = other_number; 
                   callback(projects);
               //}
            },1000);
        });
}
function SetApplyFormState(info ,callback){ 
    if(info.agree =='1'){
		for(var i = 0; i<info.student.length;i++){
			var req_member = { student_id : info.student[i].student_id, tname:info.tname, research_title:info.research_title, first_second:info.first_second, semester: info.year};
			query.CreateNewResearch(req_member, function(err){
				if(err){
					throw err;
					return;
				}
			});
            				
		}
		var formInfo = {research_title:info.research_title, tname : info.tname, first_second:info.first_second, semester:info.year};
		query.DeleteResearchApplyForm(formInfo);
		
		setTimeout(function(){
			var mailString= '';
			var nameString='';
			for(var j = 0; j< info.student.length; j++){
				mailString = mailString + info.student[j].mail + ',';
				nameString = nameString + info.student[j].student_id + ',';
			}
			var transporter = nodemailer.createTransport({
			service: 'Gmail',
			auth: {
				user: 'nctucsca@gmail.com',
				pass: 'axc3262757'
			}
			});
			
			var options = {
				//寄件者
				from: 'nctucsca@gmail.com',
				//收件者
				to: mailString, 
				//副本
				cc: '',
				//密件副本
				bcc: '',
				//主旨
				subject: '[交大資工線上助理]專題申請狀態改變通知', // Subject line
				
				html: '<p>此信件由系統自動發送，請勿直接回信！若有任何疑問，請直接聯絡您的老師跟同學,謝謝。</p><br/><p>申請狀態已變更, 請進入交大資工線上助理確認申請表狀態：<a href = "https://csca.nctu.edu.tw"> 點此進入系統</a></p><br/><br/><p>Best Regards,</p><p>交大資工線上助理 NCTU CSCA</p>'
				//附件檔案
				
			};
			
			transporter.sendMail(options, function(error, info){
				if(error){
					console.log(error);
				}
			});
			var signal = {signal :1};
			callback(signal);
		},1000);
				
	}
	else{
		var formInfo = {research_title : info.research_title, tname:info.tname, first_second:info.first_second, agree:info.agree, semester:info.year};
		query.SetResearchApplyFormStatus(formInfo);
		setTimeout(function(){
			var mailString= '';
			var nameString='';
			for(var j = 0; j< info.student.length; j++){
				mailString = mailString + info.student[j].mail + ',';
				nameString = nameString + info.student[j].student_id + ',';
			}
			var transporter = nodemailer.createTransport({
			service: 'Gmail',
			auth: {
				user: 'nctucsca@gmail.com',
				pass: 'axc3262757'
			}
			});
			
			var options = {
				//寄件者
				from: 'nctucsca@gmail.com',
				//收件者
				to: mailString, 
				//副本
				cc: /*req.body.sender_email*/'',
				//密件副本
				bcc: '',
				//主旨
				subject: '[交大資工線上助理]專題申請狀態改變通知', // Subject line
				//純文字
				/*text: 'Hello world2',*/ // plaintext body
				//嵌入 html 的內文
				html: '<p>此信件由系統自動發送，請勿直接回信！若有任何疑問，請直接聯絡 老師：' + ',學生：' + mailString +'謝謝。</p><br/><p>申請狀態已變更, 請進入交大資工線上助理確認申請表狀態：<a href = "https://csca.nctu.edu.tw"> 點此進入系統</a></p><br/><br/><p>Best Regards,</p><p>交大資工線上助理 NCTU CSCA</p>'
				//附件檔案
				/*attachments: [ {
					filename: 'text01.txt',
					content: '聯候家上去工的調她者壓工，我笑它外有現，血有到同，民由快的重觀在保導然安作但。護見中城備長結現給都看面家銷先然非會生東一無中；內他的下來最書的從人聲觀說的用去生我，生節他活古視心放十壓心急我我們朋吃，毒素一要溫市歷很爾的房用聽調就層樹院少了紀苦客查標地主務所轉，職計急印形。團著先參那害沒造下至算活現興質美是為使！色社影；得良灣......克卻人過朋天點招？不族落過空出著樣家男，去細大如心發有出離問歡馬找事'
				}]*/
			};
			
			transporter.sendMail(options, function(error, info){
				if(error){
					console.log(error);
				}
			});
			var signal = {signal :1};
			callback(signal);
		},1000);	
	}
}
function queryResearchIntro(info ,callback){  
    var Info = {research_title:info.research_title, tname:info.tname, first_second:info.first_second, semester:info.year};
	query.ShowResearchInfo(Info, function(err,result){
		if(err){
			throw err;
			return;
		}
		if(!result)
			return;
		else{
			result = JSON.parse(result);
			callback(result);	
		}
				
	});	
}
table.getProfile = function(studentId, callback){
    queryProfile(studentId, function(profile){
    callback(profile);
    });
}
table.getPass = function(studentId, callback){
    queryPass(studentId, function(pass){
	callback(pass);
    });
}
table.getCourse = function(studentId, professional_field, callback){
    queryCourse(studentId,professional_field, function(course){
	callback(course);
    });
}
table.getRule = function(studentId, callback){
    queryRule(studentId, function(rules){
        callback(rules);
    });
}
table.getList = function(studentId, callback){
    queryList(studentId, function(list){
	callback(list);
    });
}
table.getFree = function(studentId, callback){
    queryFree(studentId, function(free){
	callback(free);
    });
}
table.getNow = function(studentId, callback){
    queryNow(studentId, function(now){
        callback(now);
    });
}
table.getGeneral = function(studentId, callback){
    queryGeneral(studentId, function(general){
        callback(general);
    });
}
table.getChange = function(studentId, callback){
    queryChange(studentId, function(change){
        callback(change);
    });
}
table.getProject = function(studentId, callback){
    queryProject(studentId, function(project){
        callback(project);
    });
}
table.getProInfoAndResearchCount = function(studentId, callback){
    queryProInfoAndResearchCount(studentId ,function(info){
        callback(info);
    });
}
table.getCheckStateAndCreateNewForm = function(info, callback){
    CheckStateAndCreateNewForm(info ,function(signal){
        callback(signal);
    });
}
table.getApplyFormAndProject = function(studentId, callback){
    queryApplyFormAndProject(studentId ,function(form){
        callback(form);
    });
}
table.DeleteForm = function(info, callback){
    PerformDelete(info ,function(signal){
        callback(signal);
    });
}
table.EditProjectPage = function(info, callback){
    PerformEditProjectPage(info ,function(signal){
        callback(signal);
    });
}
table.getMentorInfo = function(studentId, callback){
    queryMentorInfo(studentId, function(info){
        callback(info);
    });
}
table.setScore = function(info, callback){
    SetProjectScore(info, function(signal){
        callback(signal);
    });
}
table.setTitle = function(info, callback){
    SetProjectTitle(info, function(signal){
        callback(signal);
    });
}
table.getProjectApplyList = function(teacherId, callback){
    queryProjectApplyList(teacherId, function(groups){
        callback(groups);
    });
}
table.getProjectList = function(info, callback){
//table.getProjectList = function(teacherId, callback){
    queryProjectList(info, function(projects){
    //queryProjectList(teacherId, function(projects){
        callback(projects);
    });
}
table.SetState = function(info, callback){
    SetApplyFormState(info, function(signal){
        callback(signal);
    });
}
table.getResearchIntro = function(info, callback){
    queryResearchIntro(info, function(intro){
        callback(intro);
    });
}
exports.tables = table;


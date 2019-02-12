var path = require('path');
var https = require('https');
var session = require('client-sessions');
var express = require('express');
var app = express();
var utils = require('./utils');
var randoms = require('./randomVals');
var bodyParser = require('body-parser');
var csrf = require('csurf');
var csrfProtection = csrf();
var helmet = require('helmet');
var api = require('./api/Index');

module.exports.init = function(){

  app.use(helmet());
  //app.use(require('./middleware/setSession').setSession);
  app.use(session({
    cookieName: "session",
    secret: randoms.randomVals.sessionKey,
    httpOnly: true,
    secure: true,
    duration: 1 * 60 * 1000,
    //activeDuration : 5 * 60 * 1000,
    //duration: 3 * 24 * 60 * 60 * 1000,
    //activeDuration : 5 * 60 * 1000,
 }));
/*  app.use(function(req, res, next){
      req.session.profile = '{"email":"sophia850413.cs03@nctu.edu.tw","username":"0316201","personStatus":"s"}';
      next();
  });*/
  app.use(csrfProtection);
  app.use(require('./middleware/setCsrf').setCsrf);
  app.use(require('./middleware/setProfile').setProfile);
  
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

//  app.use('/students/*', require('./middleware/verifyUser').verifyUser, require('./middleware/verifyUser').verifyStudents, require('./middleware/verifyUser').verifyGrade, require('./middleware/verifyUser').verifyProgram);
//  app.use('/assistants/*', require('./middleware/verifyUser').verifyUser, require('./middleware/verifyUser').verifyAssistants);
  app.use('/assistants/*', function(req, res, next){
      res.locals.studentId = req.query.student_id
      next();
  });
  app.use('/students/*', function(req, res, next){
      if(res.locals.studentId);
      else
        res.locals.studentId = '0316248';
        //res.locals.studentId = utils.getPersonId(JSON.parse(req.session.profile));
      next();
  });
  app.use(express.static('./public'));
  app.use('/', express.static('./public', {index: 'index.html'}));
  app.use('/students/head', express.static('./public', {index: 'index.html'}));
  app.use('/students/grad', express.static('./public', {index: 'index.html'}));
  app.use('/students/map', express.static('./public', {index: 'index.html'}));
  app.use('/students/recommend', express.static('./public', {index: 'index.html'}));
  app.use('/students/professor', express.static('./public', {index: 'index.html'}));
  app.use('/students/project', express.static('./public', {index: 'index.html'}));
  app.use('/teachers/head', express.static('./public', {index: 'index.html'}));
  app.use('/assistants/head', express.static('./public', {index: 'index.html'}));
  app.use('/assistants/grad', express.static('./public', {index: 'index.html'}));
  app.use('/assistants/project', express.static('./public', {index: 'index.html'}));
  app.use('/assistants/family', express.static('./public', {index: 'index.html'}));
  app.use('/assistants/family/:tid', express.static('./public', {index: 'index.html'}));
  app.use('/assistants/verify', express.static('./public', {index: 'index.html'}));

app.use('/students/credit', express.static('./public', {index: 'index.html'}));

app.use('/teachers/group', express.static('./public', {index: 'index.html'}));
app.use('/teachers/family', express.static('./public', {index: 'index.html'}));
app.use('/teachers/course', express.static('./public', {index: 'index.html'}));


/*
  app.use('/', express.static('./public', { index: 'index.login.html'}));
  app.use('/students/head', express.static('./public', { index: 'index.student.html'}));
  app.use('/assistants/head', express.static('./public', { index: 'index.assistant.html'}));
*/
 
  app.use('/assistants/head/s/:sid/:sname/:sgroup', express.static('./public', { index: 'index.html'}));
  //app.use('/api/', api());

  
  app.use(require('./routes/user/students/profile'));
  app.use(require('./routes/user/students/courseMap'));
  app.use(require('./routes/user/students/getCourseInfo/getCourseInfo'));
  app.use(require('./routes/user/students/courseMap/groupB'));
  app.use(require('./routes/user/students/coursePass'));
  app.use(require('./routes/user/students/score'));
  app.use(require('./routes/user/students/recommend/recommend'));
  app.use(require('./routes/logout'));
  app.use(require('./routes/info/getMsg'));
  app.use(require('./routes/auth/nctu/nctu'));
  app.use(require('./routes/user/students/graduate/graduateOriginal'));
  app.use(require('./routes/user/students/graduate/graduateRevised'));
  app.use(require('./routes/user/students/graduate/graduatePrint'));
  app.use(require('./routes/user/students/graduate/graduateCheck'));
  app.use(require('./routes/user/students/graduate/graduateEnglish'));
  app.use(require('./routes/user/students/graduate/graduateReorder'));
  app.use(require('./routes/user/students/graduate/graduateChange/graduateChange'));
  app.use(require('./routes/user/students/graduate/graduateChange/switchCourse.js'));
  app.use(require('./routes/user/students/graduate/graduateOrderResult'));
  app.use(require('./routes/user/students/graduate/graduateOrderInfo'));
  app.use(require('./routes/user/students/graduate/failCos'));
  app.use(require('./routes/user/students/graduate/graduateMoveReset.js'));
  app.use(require('./routes/user/students/project/NewProjectApply'));
  app.use(require('./routes/user/students/project/ProInfoAndRsearchCount'));
  app.use(require('./routes/user/students/project/ResearchInfoOfPro'));
 app.use(require('./routes/user/students/project/ProjectApplyFormStatus'));
  app.use(require('./routes/user/students/project/ProjectApplyFormDelete'));
  app.use(require('./routes/user/students/project/EditProjectPageInfo'));
  app.use(require('./routes/user/students/project/ShowStudentResearchStatus'));
  app.use(require('./routes/user/students/mail/sendtoteacher'));
  app.use(require('./routes/user/students/mentorInfo')); 
 app.use(require('./routes/user/mail/sent'));
  app.use(require('./routes/user/mail/content'));
  app.use(require('./routes/user/mail/delete'));
  app.use(require('./routes/user/mail/inbox'));
  app.use(require('./routes/user/assistants/profile'));
  app.use(require('./routes/user/assistants/graduate/graduateOriginal'));
  app.use(require('./routes/user/assistants/graduate/graduateRevised'));
  app.use(require('./routes/user/assistants/graduate/graduatePrint'));
  app.use(require('./routes/user/assistants/graduate/graduateCheck'));
  app.use(require('./routes/user/assistants/graduate/graduateEnglish'));
  app.use(require('./routes/user/assistants/graduate/studentList'));
  app.use(require('./routes/user/assistants/getStudent'));
  app.use(require('./routes/user/assistants/researchTeacher'));
  app.use(require('./routes/user/assistants/mail/mailLogin.js'));
  app.use(require('./routes/user/assistants/researchGradeList.js'));
 app.use(require('./routes/user/assistants/ResearchGradeDownload.js'));
  app.use(require('./routes/user/assistants/StudentResearchList.js'));
 app.use(require('./routes/user/assistants/ProResearchList.js'));
 app.use(require('./routes/user/assistants/advisee/TeacherList.js'));
 app.use(require('./routes/user/assistants/advisee/StudentList.js'));
  app.use(require('./routes/user/assistants/StudentGradeList.js'));
  app.use(require('./routes/user/assistants/SetFirstSecond.js'));
  app.use(require('./routes/user/students/graduate/graduateReorderReset'));
  app.use(require('./routes/user/professor/profile'));
  app.use(require('./routes/user/professor/courseInfo/score'));
  app.use(require('./routes/user/professor/courseInfo/interval'));
  app.use(require('./routes/user/professor/courseInfo/courses'));
  app.use(require('./routes/user/professor/courseInfo/courseNow'));
  app.use(require('./routes/user/professor/students/AdviseeList.js'));
  app.use(require('./routes/user/professor/students/StudentGradeList.js'));
  app.use(require('./routes/user/professor/students/StudentList.js'));
  app.use(require('./routes/user/professor/students/research/FormalResearch'));
  app.use(require('./routes/user/professor/students/research/ResearchApplyFormList'));
  app.use(require('./routes/user/professor/students/research/SetApplyFormState'));
  app.use(require('./routes/user/professor/students/research/SetResearchScore'));
  app.use(require('./routes/user/professor/students/research/SetResearchTitle'));
  app.use(require('./routes/user/professor/info'));
  app.use(require('./routes/user/mail/getStudentList'));
  app.use(require('./routes/user/mail/getTeacherList'));
  app.use(require('./routes/user/mail/sendmail'));
  app.use(require('./routes/user/mail/readSet'));
  app.use(require('./routes/user/professor/students/StudentInfo'));
  // app.use(require('./routes/user/CreateSecondResearch'));
  app.use(require('./routes/user/assistants/SetAddStatus'));
  app.use(require('./routes/user/testAPI.js'));
  app.use(require('./routes/user/students/createOffsetApplyForm.js')); 
  app.use(require('./routes/user/assistants/ShowUserOffsetApplyForm.js'));
  app.use(require('./routes/user/assistants/AddToOffset.js'));
  app.use(require('./routes/user/assistants/SetOffsetApplyFormAgreeStatus.js'));
  app.use(require('./routes/user/assistants/graduate/graduateList'));
  app.use(require('./routes/user/assistants/graduate/gradeStudent'));
  app.use(require('./routes/user/assistants/graduate/graduateStudent'));
  app.use(require('./routes/user/assistants/graduate/graduateListDownload'));
  app.use(require('./routes/user/students/graduate/graduateChange/graduateList'));
  app.use(require('./routes/user/students/createEnglishOffsetApplyForm.js'));
  app.use(require('./routes/user/students/recommend/showHotCos.js'));
  app.use(require('./routes/user/students/recommend/setRecommendCosStar.js'));
  app.use(require('./routes/user/students/OffsetApplyFormAllInfo.js'));
  app.use(require('./routes/user/professor/SetOffsetApplyFormAgreeStatus.js'));
  app.use(require('./routes/user/students/credit/waiveCourse.js'));
  app.use(require('./routes/user/students/credit/exemptCourse.js'));
  return app;
};

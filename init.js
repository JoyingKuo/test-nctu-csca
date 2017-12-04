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
  app.use(function(req, res, next){
      req.session.profile = '{"email":"sophia850413.cs03@nctu.edu.tw","username":"0312512","personStatus":"s"}';
      next();
  });
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
        res.locals.studentId = '0312512';
        //res.locals.studentId = utils.getPersonId(JSON.parse(req.session.profile));
      next();
  });


  app.use('/', express.static('./public', { index: 'index.login.html'}));
  app.use('/students/head', express.static('./public', { index: 'index.student.html'}));
  app.use('/assistants/head', express.static('./public', { index: 'index.assistant.html'}));
  app.use('/assistants/head/s/:sid', express.static('./public', { index: 'index.assistant.html'}));

  app.use(require('./routes/user/students/profile'));
  app.use(require('./routes/user/students/courseMap'));
  app.use(require('./routes/user/students/coursePass'));
  app.use(require('./routes/user/students/score'));
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
  app.use(require('./routes/user/students/graduate/graduateOrderResult'));
  app.use(require('./routes/user/students/graduate/graduateOrderInfo'));
  app.use(require('./routes/user/assistants/profile'));
  app.use(require('./routes/user/assistants/graduate/graduateOriginal'));
  app.use(require('./routes/user/assistants/graduate/graduateRevised'));
  app.use(require('./routes/user/assistants/graduate/graduatePrint'));
  app.use(require('./routes/user/assistants/graduate/graduateCheck'));
  app.use(require('./routes/user/assistants/graduate/graduateEnglish'));
  app.use(require('./routes/user/assistants/graduate/studentList'));
  app.use(require('./routes/user/assistants/getStudent'));
  app.use(require('./routes/user/assistants/mail/mailLogin.js'));
  return app;
};

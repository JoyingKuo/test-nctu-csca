const request = require('request');
var utils = require('../../../utils');
var courseResult = {};
courseResult.processResult = function(req, res, next){
        var result = {
                total: 0,
                total_require: 128,
                compulsory: 0,
                compulse_require: 58,
                core: 0,
                core_require: 0,
                vice: 0,
                vice_require: 0,
                pro: 0,
                pro_require: 0,
                english: 0,
                english_require: 1,
                other: 0,
                other_require: 0,
                general: 0,
                general_require: 20,
                general_new: 0,
                general_new_require: 22,
                pe: 0,
                pe_require: 6,
                language: 0,
                language_require: 8,
                service: 0,
                service_require: 2,
                art: 0,
                art_require: 2,
                graduate: 0
        }
  	if(req.session.profile){
  		var rules = JSON.parse(req.rules);
          //   console.log(rules);  	
            var CourseResult = res.locals.courseResult;
  		//console.log(CourseResult[0].course);
  		var EnglishCourse = res.locals.English;
          	result.compulsory = CourseResult[0].credit;
            result.compulse_require = parseFloat(rules[0].require_credit); 	
            result.core =  CourseResult[1].credit;
          	result.core_require = parseFloat(rules[0].core_credit);
          	result.vice = CourseResult[2].credit;
          	result.vice_require = parseFloat(rules[0].sub_core_credit);
          	result.pro = CourseResult[3].credit;
          	result.pro_require = parseFloat(rules[0].pro_credit);
  		    result.english = EnglishCourse.length;
          	result.other = CourseResult[4].credit;
          	result.other_require = parseFloat(rules[0].free_credit);
          	result.language = CourseResult[5].credit;
          	result.general = CourseResult[6].credit;
            result.general_new = CourseResult[7].credit.total;
          	result.pe = CourseResult[8].course.length;
            result.graduate = CourseResult[11].credit;

            for(var i = 0; i<CourseResult[8].course.length; i++){
              if(CourseResult[8].course[i].reason == 'now')
                  result.pe--;
            }
          	result.service = CourseResult[9].course.length;
            for(var i = 0; i<CourseResult[9].course.length; i++){
                 if(CourseResult[9].course[i].reason == 'now')
                     result.service --;
            }
          	result.art = CourseResult[10].course.length;
            for(var i = 0; i<CourseResult[10].course.length; i++){
                if(CourseResult[10].course[i].reason == 'now')
                    result.art--; 
            }    
          	for(var i = 0; i<CourseResult.length; i++){
                  if((typeof(CourseResult[i].credit) != undefined) && (CourseResult[i].credit))
                  	if(i != 11 && i != 7){
                        result.total += CourseResult[i].credit;
                    }
                  //else
                    //  console.log(res.locals.studentId + " : " + CourseResult[i].title);
            }
            result.total = result.total.toFixed(2);
            result.total = parseFloat(result.total);

  		CourseResult.push(result);
  	}
  	else {
      		res.redirect('/');
  	}
	res.locals.courseResult = CourseResult;
	next();
}

exports.courseResult = courseResult;

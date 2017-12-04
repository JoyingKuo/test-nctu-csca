var restore = {};

restore.processRestore = function(req, res, next){
    
    if(req.session.profile){
        var studentId = res.locals.studentId;
        var courseResult = res.locals.courseResult;
        //console.log("courseResult length");
        //console.log(courseResult[0].course);
        var courses = req.changeCourses;
        console.log("in processRestore");
        console.log(courses);
        console.log("length");
        courses = JSON.parse(courses);
        console.log(courses.length);
        var restore = [];
        var restoreIndex = [];
        var tempPre = [];
        var tempNext = [];
        
        for(var i = 0; i<10; i++){
            var course = {
                pre:[],
                next:[]
            }
            restore.push(course);
        }
        for(var i = 0; i<10; i++){
            var course = {
                pre:[],
                next:[]
            }
            restoreIndex.push(course);
        }
        for(var i = 0; i<courses.length; i++){
            if(courses[i].orig_pos == '共同必修'){
                restore[0].pre[courses[i].cos_cname] = true;
                restoreIndex[0].pre.push(courses[i].cos_cname);    
            }
            else if(courses[i].orig_pos == '核心課程'){
                restore[1].pre[courses[i].cos_cname] = true;
                restoreIndex[1].pre.push(courses[i].cos_cname);
            }
            else if(courses[i].orig_pos == '副核心與他組核心'){
                restore[2].pre[courses[i].cos_cname] = true;
                restoreIndex[2].pre.push(courses[i].cos_cname);
            }
            else if(courses[i].orig_pos == '專業選修'){
                restore[3].pre[courses[i].cos_cname] = true;
                restoreIndex[3].pre.push(courses[i].cos_cname);
            }
            else if(courses[i].orig_pos == '其他選修'){
                restore[4].pre[courses[i].cos_cname] = true;
                restoreIndex[4].pre.push(courses[i].cos_cname);
            }
            else if(courses[i].orig_pos == '外語'){
                restore[5].pre[courses[i].cos_cname] = true;
                restoreIndex[5].pre.push(courses[i].cos_cname);
            }
            else if(courses[i].orig_pos == '通識'){
                restore[6].pre[courses[i].cos_cname] = true;
                restoreIndex[6].pre.push(courses[i].cos_cname);
            }
            else if(courses[i].orig_pos == '體育'){
                restore[7].pre[courses[i].cos_cname] = true;
                restoreIndex[7].pre.push(courses[i].cos_cname);
            }
            else if(courses[i].orig_pos == '服務學習'){
                restore[8].pre[courses[i].cos_cname] = true;
                restoreIndex[8].pre.push(courses[i].cos_cname);
            }
            else if(courses[i].orig_pos == '藝文賞析'){
                restore[9].pre[courses[i].cos_cname] = true;
                restoreIndex[9].pre.push(courses[i].cos_cname);
            }
            if(courses[i].now_pos == '共同必修'){
                restore[0].next[courses[i].cos_cname] = true;
                restoreIndex[0].next.push(courses[i].cos_cname);
            }
            else if(courses[i].now_pos == '核心課程'){
                restore[1].next[courses[i].cos_cname] = true;
                restoreIndex[1].next.push(courses[i].cos_cname);
            }
            else if(courses[i].now_pos == '副核心與他組核心'){
                restore[2].next[courses[i].cos_cname] = true;
                restoreIndex[2].next.push(courses[i].cos_cname);
            }
            else if(courses[i].now_pos == '專業選修'){
                restore[3].next[courses[i].cos_cname] = true;
                restoreIndex[3].next.push(courses[i].cos_cname);
            }
            else if(courses[i].now_pos == '其他選修'){
                restore[4].next[courses[i].cos_cname] = true;
                restoreIndex[4].next.push(courses[i].cos_cname);
            }
            else if(courses[i].now_pos == '外語'){
                restore[5].next[courses[i].cos_cname] = true;
                restoreIndex[5].next.push(courses[i].cos_cname);
            } 
            else if(courses[i].now_pos == '通識'){
                restore[6].next[courses[i].cos_cname] = true;
                restoreIndex[6].next.push(courses[i].cos_cname);
            }
            else if(courses[i].now_pos == '體育'){
                restore[7].next[courses[i].cos_cname] = true;
                restoreIndex[7].next.push(courses[i].cos_cname);
            }
            else if(courses[i].now_pos == '服務學習'){
                restore[8].next[courses[i].cos_cname] = true;
                restoreIndex[8].next.push(courses[i].cos_cname);
            }
            else if(courses[i].now_pos == '藝文賞析'){
                restore[9].next[courses[i].cos_cname] = true;
                restoreIndex[9].next.push(courses[i].cos_cname);
            }
        }
       console.log("In the restore");
       console.log(restore);
       console.log("In the courseResult");
       //for(var i = 0; i<courseResult[0].course.length; i++)
          // console.log(courseResult[0].course[i].code);
       for(var i = 0; i<courseResult.length; i++){
        for(var q = 0; q<courseResult[i].course.length; q++){
            if(i == 0)
                console.log(courseResult[i].course[q].code);
            if(restore[i].pre[courseResult[i].course[q].code] == true){
                if(i == 0){
                    console.log("i: "+ i+" / "+"q: "+ q);
                    console.log(courseResult[i].course[q].code);
                }
                tempPre[courseResult[i].course[q].code] = courseResult[i].course[q];
                //courseResult[i].credit -= courseResult[i].course[q].realCredit;
                courseResult[i].course.splice(q,1);
            }
        }
       }
       console.log("In restoreIndex");
       console.log(restoreIndex);
       //console.log(tempPre);
       //push the course the course in next to the new position
       for(var i = 0; i<courseResult.length; i++){
        for(var q = 0; q<restoreIndex[i].next.length; q++){
                if(i == 0){
                console.log("i: "+ i+" / "+"q: "+ q)
                console.log(restoreIndex[i].next[q]);
                console.log(tempPre[restoreIndex[i].next[q]]);
                }
                //courseResult[i].course.push(tempPre[restoreIndex[i].next[q]]);
                //courseResult[i].credit += tempPre[restoreIndex[i].next[q]].realCredit;
            }
        }
       res.locals.courseResult = courseResult;
    }
    else
        res.redirect('/');
    next();

}

exports.restore = restore;

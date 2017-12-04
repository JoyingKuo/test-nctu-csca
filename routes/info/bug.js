var bug = {};

bug.getBug = function(req, res, next){

    var msg = [];
    var temp = '霹靂優課程尚無法處理';
    msg.push(temp);
    temp = '其他選修課程轉為通識尚無法處理';
    msg.push(temp);
    temp = '微學分課程尚無法處理';
    msg.push(temp);
    res.locals.msg = msg;
    next();

}

exports.bug = bug;

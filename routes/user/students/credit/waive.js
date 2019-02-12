var utils = require('../../../../utils');
var m = require('../../../../db/msql');
var waive = {}

waive.getwaive = function(req, res, next) {
    if (req.session.profile) {
        var student_id = res.locals.studentId;
        // var student_id = '0516004'
        var sid = {student_id: student_id};
        var data = {
            sname: '',
            student_id: '',
            phone: '',
            original_school: '',
            original_department: '',
            current_school: '',
            current_department: '',
            original_graduation_credit: 0,
            waive_list: [],
            original_course_total: 0,
            original_credit_total: 0,
            current_course_total: 0,
            current_credit_total: 0
        };
        m.ShowUserOffsetApplyForm(sid, function(err, result) {
            if (err) {
                throw err;
                res.redirect('/');
            } else {
                var offset_form = JSON.parse(result);
                data.sname = offset_form[0].sname;
                data.student_id = offset_form[0].student_id;
                data.phone = offset_form[0].phone;
                data.original_school = '交通大學';
                // data.original_department = ''; // how bout course from different department?
                data.current_school = '交通大學';
                data.current_department = '資工系';
                // data.original_graduation_credit = 100;
                var list = [];
                for (var i = 0; i < offset_form.length; i++) {
                    var waive = {
                        original: {
                        course_name: '',
                        apply_year: 0,
                        apply_semester: 0,
                        course_department: '',
                        credit: 0,
                        score: 0
                        },
                        current: {
                            course_code: '',
                            credit: 0
                        }
                    };
                    waive.original.course_name = offset_form[i].cos_cname_old;
                    waive.original.apply_year = offset_form[i].apply_year;
                    waive.original.apply_semester = offset_form[i].apply_semester;
                    waive.original.course_department = offset_form[i].cos_dep_old;
                    waive.original.credit = offset_form[i].credit_old;
                    // waive.original.score = 60;
                    waive.current.course_code = offset_form[i].cos_code;
                    waive.current.credit = offset_form[i].credit;
                    list.push(waive);

                    data.original_course_total += 1;
                    data.original_credit_total += waive.original.credit;
                    data.current_course_total += 1;
                }
                data.waive_list = list;
            }
            res.locals.waive = data;
            next();
        });
    } else {
        res.redirect('/');
    }
}

exports.waive = waive;


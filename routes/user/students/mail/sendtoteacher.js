var express = require('express');
var nodemailer = require('nodemailer');
var router = express.Router();
var query = require('../../../../db/msql');
var csrf = require('csurf');
var csrfProtection = csrf();


//console.log(Name);
router.post('/students/mail/sendtoteacher' , csrfProtection, function(req, res){

//console.log(StudentId);
   if(req.session.profile){
        
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
			to: req.body.receiver_email, 
			//副本
			cc: req.body.sender_email,
			//密件副本
			bcc: '',
			//主旨
			subject: req.body.title, // Subject line
			//純文字
			/*text: 'Hello world2',*/ // plaintext body
			//嵌入 html 的內文
			html: '<p>此信件由系統自動發送，請勿直接回信！若有任何疑問，請聯絡：' + req.body.name +' () 先生/小姐 '+ req.body.sender_email +'謝謝。</p><p>This message is automatically sent by e3 system, please do not reply directly! If you have any questions, please contact with Mr/Ms. '+ req.body.name +'()'+req.body.sender_email+'.</p><p>- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</p><p>'+req.body.content+'</p>'
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

        setTimeout(function(){
                var signal = {signal :1};
                 res.send(signal);
                 },1000);
      /*  var  teacher_list = [] 
        query.ShowTeacherIdList(function(err,result){
                if(err)
                {
                      throw err;     
                      res.redirect('/');
                }

                if(!result)
                     res.redirect('/');

                teacher_list = JSON.parse(result);
  
                    var teacher_id; 
                    for(var i=0;i < teacher_list.length; i++ )
                     {
                        if(teacher_list[i].tname == req.body.teacher)
                        {
                            teacher_id = teacher_list[i].teacher_id;
                            break;
                            
                        }
                    } 
                  
            var mailContent = {sender_id : req.body.id , title :req.body.title, receiver_id: teacher_id, content: req.body.content};
           // console.log(mailContent);
            query.CreateMail(mailContent);
       
        });*/
         /*console.log("ID: " + mailContent.id);
        console.log("title: " + mailContent.title);
        console.log("content: " + mailContent.content);
        console.log("time: " + mailContent.time);
        console.log("teacher: " + mailContent.teacher);
        console.log("read: " + mailContent.read);*/
        //res.send(mailContent);
		//result = JSON.stringify(mailContent);
			//	query.mailCreate(mailContent);
		     

       
    }
    else
      res.redirect('/');

});

module.exports = router;

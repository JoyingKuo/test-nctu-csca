const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer');
const router = express.Router();


router.post('/assistants/mail/loginState', (req, res) => {

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.cs.nctu.edu.tw',
    port: 25, 
    secure: false, // true for 465, false for other ports
    auth: {
        user: req.body.account, // generated ethereal user
        pass: req.body.password  // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    },
    authMethods: "[‘PLAIN’, ‘LOGIN’, ‘XOAUTH2’]" 
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: req.body.account + '@cs.nctu.edu.tw', // sender address
      to: 'whydarkmeow@gmail.com', // list of receivers
      subject: 'Sophia meowmeow', // Subject line
      text: 'Hello world?', // plain text body
      html: "Duck Duck Meow Meow" // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          res.json({"login": false});
          return console.log(error);
      }
      else{
        console.log('Message sent: %s', info.messageId);   
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
         let emailId = req.body.account + '@cs.nctu.edu.tw';
         res.json({"login": true, "emailId": emailId});
         req.session.email.account = req.body.acoount;
         req.session.email.account = req.body.password;
     }

  });
  });
module.exports = router;



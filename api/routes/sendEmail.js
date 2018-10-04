const express = require('express');

var MailParser = require("mailparser-mit").MailParser;
nodeMailer = require('nodemailer');
bodyParser = require('body-parser');

var Imap = require('imap'),
    inspect = require('util').inspect;


const router = express.Router();

router.get('/:to/:subject/:body', (req, res, next) => {

    SendEmail(res,req);

});

function openInbox(cb) {
    imap.openBox('INBOX', true, cb);
}


function SendEmail(res,req) {

    let transporter = nodeMailer.createTransport({
        host: 'smtp.zoho.com',
        port: 587,
        secure: false,
        auth: {
            user: 'kokua.contato@gmail.com',
            pass: 'Muhammad22@'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let mailOptions = {
        from: '"Kokua" <kokua.contato@gmail.com>', // sender address
        to: req.params.to, // list of receivers
        subject: req.params.subject, // Subject line
        text: req.params.body, // plain text body
        html: '<b>NodeJS Email Tutorial</b>' // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(200).json({
                message: "Feild",
                orderId: "Send Email"
            });
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
        res.status(200).json({
            message: "Sent",
            orderId: "Send Email"
        });
    });
}




module.exports = router;
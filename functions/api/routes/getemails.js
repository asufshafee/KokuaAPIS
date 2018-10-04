const express = require('express');

var MailParser = require("mailparser-mit").MailParser;
nodeMailer = require('nodemailer');
bodyParser = require('body-parser');

var Imap = require('imap'),
    inspect = require('util').inspect;

var imap = new Imap({
    user: 'kokua.contato@gmail.com',
    password: 'Muhammad22@',
    host: 'imap.zoho.com',
    port: 993,
    tls: true,
    tlsOptions: { rejectUnauthorized: false }
});


// var imap = new Imap({
//     user: 'kokua.admmin@gmail.com',
//     password: 'qwe,1234',
//     host: 'imap.gmail.com',
//     port: 993,
//     tls: true,
//     tlsOptions: { rejectUnauthorized: false }
// });

var Emails = [];
var Email = {
    From: "",
    To: "",
    Message: "",
    Subject: ""
};


const router = express.Router();

router.get('/:subject', (req, res, next) => {
    SearchEmails(res, req);
});




function openInbox(cb) {
    imap.openBox('INBOX', true, cb);
}



// function GetEmail(res) {

//     Emails = [];
//     imap.once('ready', function () {
//         openInbox(function (err, box) {

//             if (err) throw err;
//             var f = imap.seq.fetch('1:300000', {
//                 bodies: '',
//                 struct: true
//             });
//             console.log("You have  messages in your INBOX " + box.messages.total)
//             f.on('message', function (msg, seqno) {

//                 var prefix = '(#' + seqno + ') ';
//                 var buffer = '';


//                 var parser = new MailParser({ streamAttachments: true });
//                 // parser.on("headers", function(headers) {
//                 //     console.log("Header: " + JSON.stringify(headers));
//                 //  });
//                 parser.on("end", function (mailObj) {
//                     Emails.push(mailObj);
//                     console.log(Emails.length);
//                     if (Emails.length == box.messages.total) {
//                         res.status(200).json({
//                             message: Emails,
//                             orderId: "Emails"
//                         });
//                         imap.end();
//                     }
//                 });


//                 // console.log('Message #%d', seqno);
//                 // console.log('Message #%d', msg.text);
//                 msg.on('body', function (stream, info) {
//                     stream.on("data", function (chunk) {
//                         // parser.write(chunk);
//                         buffer += chunk.toString('utf8');

//                     });
//                     stream.once('end', function () {
//                         //send the entire mail message to mailParser
//                         console.log(prefix + " writing buffer to mailParser");
//                         parser.write(buffer);
//                     });
//                 });
//                 msg.once('attributes', function (attrs) {
//                     //   console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8));
//                 });
//                 msg.once('end', function () {
//                     parser.end();

//                     //   console.log(prefix + 'Finished');
//                 });
//             });
//             f.once('error', function (err) {
//                 console.log('Fetch error: ' + err);
//             });
//             f.once('end', function () {
//                 console.log('Done fetching all messages!');

//             });
//         });
//     });



//     imap.once('error', function (err) {
//         console.log(err);
//     });

//     imap.once('end', function () {
//         console.log('Connection ended');
//     });

//     imap.connect();

// }




SearchEmails(res, req)
{
    req.params.subject
    openInbox(function (err, box) {
        if (err) throw err;
        imap.search(['OR SUBJECT ' + req.params.subject], function (err, results) {
            if (err) throw err;
            var f = imap.fetch(results, { bodies: '' });
            f.on('message', function (msg, seqno) {

                var prefix = '(#' + seqno + ') ';
                var buffer = '';
                
                var parser = new MailParser({ streamAttachments: true });
                // parser.on("headers", function(headers) {
                //     console.log("Header: " + JSON.stringify(headers));
                //  });
                parser.on("end", function (mailObj) {
                    Emails.push(mailObj);
                    console.log(Emails.length);
                    if (Emails.length == box.messages.total) {
                        res.status(200).json({
                            message: Emails,
                            orderId: "Emails"
                        });
                        imap.end();
                    }
                });


                // console.log('Message #%d', seqno);
                // console.log('Message #%d', msg.text);
                msg.on('body', function (stream, info) {
                    stream.on("data", function (chunk) {
                        // parser.write(chunk);
                        buffer += chunk.toString('utf8');

                    });
                    stream.once('end', function () {
                        //send the entire mail message to mailParser
                        console.log(prefix + " writing buffer to mailParserSubject");
                        parser.write(buffer);
                    });
                });
                msg.once('attributes', function (attrs) {
                    //   console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8));
                });
                msg.once('end', function () {
                    parser.end();

                    //   console.log(prefix + 'Finished');
                });




            });
            f.once('error', function (err) {
                console.log('Fetch error: ' + err);
            });
            f.once('end', function () {
                console.log('Done fetching all messagesajsndjkasbjd!');
                imap.end();
            });
        });
    });


}



module.exports = router;
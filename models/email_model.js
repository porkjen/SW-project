var nodemailer = require('nodemailer');
var credentials = require('./credentials');

module.exports = function() {

    var mailTransport = nodemailer.createTransport('SMTP', {
        service: 'Gmail',
        auth: {
            user: credentials.gmail.user,
            pass: credentials.gmail.pass,
        },
    });
    var from = '"海大共乘網" <motorcyclesoftware@gmail.com>';
    var errorRecipient = 'motorcyclesoftware@gmail.com';

    return {
        send: function(receiver, subj, textBody) {
            var sendData = {
                from:       from,
                to:         receiver,
                subject:    subj,
                text:       textBody,
                html:       "<a href='http://127.0.0.1/mainpage'>海大共乘網</a>"
            };

            mailTransport.sendMail(sendData, function(err) {
                if (err) 
                    console.log('[err] Unable to send email: ' + err);
                else
                    console.log('[succ] Succeed to send email to: ' + toString(receiver));
            });
        }, emailError: function(message, filename, exception) {
            var body = '<h1>Error</h1>' + 'message:<br><pre>' + message + '</pre><br>';
            if (exception) body += 'exception:<br><pre>' + exception + '</pre><br>';
            if (filename) body += 'filename:<br><pre>' + filename + '</pre><br>';
            mailTransport.sendMail({
                from:       from,
                to:         errorRecipient,
                subject:    'Site Error',
                html:       body,
                generateTextFromHtml: true,
            },function(err) {
                if (err) 
                console.log('Unable to send email: ' + err);
            });
        }
    };
};
const nodemailer = require('nodemailer');
const { HOST_NAME, EMAIL, PASSWORD } = require('./config');

const smtpConfig = {
    host: HOST_NAME,
    port: '587',
    secure: false,
    requireTLS: true,
    auth: {
        user: EMAIL,
        pass: PASSWORD
    }
};

const transporter = nodemailer.createTransport(smtpConfig);
 
const defaultMail = {
  from: EMAIL,
  to: EMAIL,
  subject: 'General Comment',
  text: 'n/a',
  html: '<p>n/a</p>'
};


const sendEmail = (mailOptions) => {
	return transporter.sendMail(mailOptions || defaultMail, (error, info) => {
	    if(error){
	        return console.log('Error encountered: ' + error);
	    }
	    console.log('Message sent: ' + info.response);
	});
};

const sendFeedbackEmailToCorrectAddress = (event, context) => {
	const data = {
		from: defaultMail.from,
		to: defaultMail.to,
		subject: event.body.subject || defaultMail.subject,
		text: event.body.text || defaultMail.text,
		html: event.body.html || defaultMail.html
	};

	sendEmail(data);
};

exports.sendFeedbackEmail = sendFeedbackEmailToCorrectAddress;

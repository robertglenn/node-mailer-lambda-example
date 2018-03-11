const nodemailer = require('nodemailer');
const { HOST_NAME, USER_NAME, PASSWORD } = require('./config');

const smtpConfig = {
    host: HOST_NAME,
    port: '587',
    secure: false,
    requireTLS: true,
    auth: {
        user: USER_NAME,
        pass: PASSWORD
    }
};

const transporter = nodemailer.createTransport(smtpConfig);
 
const defaultMail = {
  from: USER_NAME,
  to: USER_NAME,
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

const sendFeedbackEmailToCorrectAddress = (rawData) => {
	const data = {
		from: defaultMail.from,
		to: defaultMail.to,
		subject: rawData.subject || defaultMail.subject,
		text: rawData.text || defaultMail.text,
		html: rawData.html || defaultMail.html
	};

	sendEmail(data);
};

exports.sendFeedbackEmail = sendFeedbackEmailToCorrectAddress;

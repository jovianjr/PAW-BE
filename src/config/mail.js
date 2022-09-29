const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport(
	process.env.NODE_ENV === 'production'
		? {
				host: process.env.EMAIL_HOST,
				secure: process.env.EMAIL_SSL,
				port: process.env.EMAIL_PORT ?? 465,
				auth: {
					user: process.env.EMAIL_FROM,
					pass: process.env.EMAIL_PASS,
				},
		  }
		: {
				host: 'localhost',
				port: process.env.EMAIL_PORT ?? 8025,
				secure: false,
				tls: {
					rejectUnauthorized: false,
				},
		  }
);

const verifyNodemailer = async () => {
	console.log('nodemailer: connecting');
	return transporter.verify((error, success) => {
		if (error) {
			console.log('nodemailer: error, cant connect');
			console.log(error);
		} else {
			console.log('nodemailer: connected');
		}
	});
};

const sendMail = async (transport, params) => {
	mailOptions = {
		from: `PAW <${process.env.EMAIL_FROM}>`,
		to: params.to,
		subject: `PAW: ${params.subject}`,
		html: `<div style="
                    height: 100%;
                    width: 100%;
                    padding: 5% 10%;
                ">
                    <div style="background-color: white; max-width: 500px; height: auto; padding: 20px; border-radius: 10px">
                    ${params.body}
                    </div>
                </div>`,
	};

	await transport.sendMail(mailOptions);
};

module.exports = { transporter, sendMail, verifyNodemailer };

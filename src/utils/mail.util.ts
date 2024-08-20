import nodemailer from 'nodemailer';
import config from '../config/config.js';
// const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: config.development.mailUser,
        pass: config.development.mailPass
    }
});
const sendMail = async (user) => {
    const body = {
        from: `"Your Name" <${config.development.mailUser}>`, 
        to: user,
        subject: 'Hello from Node.js', 
        text: 'This is a test email sent from Node.js',
        html: '<b>This is a test email sent from Node.js</b>'
    };

    await transporter.sendMail(body, (err, info) => {
        if (err) {
            return console.log(err);
        }
        return info.messageId;
    });
}

export default sendMail;



import dotenv from 'dotenv'
import express from 'express'
import nodemailer from 'nodemailer'
import nodemailerSes from 'nodemailer-ses-transport'
import pug from 'pug'
import path from 'path'

dotenv.config();

let router = express.Router();

router.post('/send', (req, res, next) => {
    const transporter = nodemailer.createTransport(nodemailerSes({
        accessKeyId: process.env.SES_ACCESS_KEY_ID,
        secretAccessKey: process.env.SES_SECRET_ACCESS_KEY
    }));

    const mailOptions = {
        from: `"${req.body.name}" <${req.body.email}>`,
        to: 'resurtm+dev@gmail.com',
        subject: 'Bug Tracker Node',
        text: pug.renderFile(path.join(__dirname, '..', '..', 'views', 'emails', 'contact-text.pug'), req.body),
        html: pug.renderFile(path.join(__dirname, '..', '..', 'views', 'emails', 'contact-html.pug'), req.body)
    };

    transporter.sendMail(mailOptions, (error, info) => {
        let json;
        if (error) {
            console.log('Message cannot be sent:');
            console.log(error);
            json = {status: 'failed', message: error.message};
        } else {
            console.log('Message has been sent:');
            console.log(info);
            json = {status: 'ok'};
        }
        res.json(json);
    });
});

export default router

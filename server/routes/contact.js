import dotenv from 'dotenv'
import express from 'express'
import nodemailer from 'nodemailer'
import nodemailerSes from 'nodemailer-ses-transport'

dotenv.config();

let router = express.Router();

let sendContactMessage = (req, res) => {
    return new Promise((resolve, reject) => {
        let html;
        let text;

        res.app.render('emails/contact-text', req.body, (err, result) => {
            if (err) {
                reject(err);
            } else {
                text = result;
            }
        });
        res.app.render('emails/contact-html', req.body, (err, result) => {
            if (err) {
                reject(err);
            } else {
                html = result;
            }
        });

        const transporter = nodemailer.createTransport(nodemailerSes({
            accessKeyId: process.env.SES_ACCESS_KEY_ID,
            secretAccessKey: process.env.SES_SECRET_ACCESS_KEY
        }));

        const mailOptions = {
            from: `"${req.body.name}" <${req.body.email}>`,
            to: 'resurtm+dev@gmail.com',
            subject: 'Bug Tracker Node',
            text,
            html
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                reject(err.message);
            } else {
                resolve(info);
            }
        });
    });
};

router.post('/send', (req, res, next) => {
    sendContactMessage(req, res)
        .then(val => {
            console.log('Contact message has been sent:');
            console.log(val);
            res.json({status: 'ok'});
        })
        .catch(err => {
            console.log('Contact message send error:');
            console.log(err);
            res.status(400).json({status: 'failed', message: err});
        });
});

export default router

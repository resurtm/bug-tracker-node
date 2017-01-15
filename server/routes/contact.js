import dotenv from 'dotenv'
import express from 'express'
import nodemailer from 'nodemailer'
import nodemailerSes from 'nodemailer-ses-transport'

dotenv.config();

let router = express.Router();

router.post('/send', (req, res, next) => {
    console.log(req.body);

    let transporter = nodemailer.createTransport(nodemailerSes({
        accessKeyId: process.env.SES_ACCESS_KEY_ID,
        secretAccessKey: process.env.SES_SECRET_ACCESS_KEY
    }));

    const mailOptions = {
        from: `"${req.body.name}" <${req.body.email}>`,
        to: 'resurtm+dev@gmail.com',
        subject: 'Bug Tracker Node',
        text: req.body.message,
        html: req.body.message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });

    res.json({status: 'ok'});
});

export default router

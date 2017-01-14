import express from 'express';
import sleep from 'sleep';

var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('main');
});

router.get('/quote', function (req, res, next) {
    sleep.sleep(2);
    res.json({text: 'Hello, world!'});
});

export default router;

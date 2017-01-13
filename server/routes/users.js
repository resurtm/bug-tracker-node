import express from 'express';

var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('users/index');
});

export default router;

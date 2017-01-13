import path from 'path';
import http from 'http';
import dotenv from 'dotenv';
import express from 'express';

import indexRouter from './routes/index';

dotenv.config();

var app = express();
app.set('port', process.env.EXPRESS_PORT || 3000);
app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'pug');

app.use('/', indexRouter);

var server = http.createServer(app);
server.on('error', error => {
    console.log(error);
});
server.on('listening', () => {
    console.log('Listening on port ' + app.get('port'));
});
server.listen(app.get('port'));

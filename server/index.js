import path from 'path'
import http from 'http'
import dotenv from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'

import contactRouter from './routes/contact';
import indexRouter from './routes/index';

dotenv.config();

let app = express();

app.set('port', process.env.EXPRESS_PORT || 3000);
app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(helmet());
app.use(express.static('public'));

app.use('/contact', contactRouter);
app.use('/', indexRouter);

let server = http.createServer(app);
server.on('error', error => {
    console.log(error);
});
server.on('listening', () => {
    console.log('Listening on port ' + app.get('port'));
});
server.listen(app.get('port'));

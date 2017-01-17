import http from 'http'
import dotenv from 'dotenv'
import socketio from 'socket.io'

dotenv.config();

const app = http.createServer();
const io = socketio(app);

app.listen(process.env['SOCKETIO_SERVER_PORT'], process.env['SOCKETIO_SERVER_HOST'], () => {
    console.log('Server is running');
});

io.on('connection', (socket) => {
    console.log('Connection');
    console.log(socket);
});

io.on('disconnect', () => {
    console.log('Disconnect');
});

/*
io.on('connection', function (socket) {
    if ('token' in socket.handshake.query) {
        console.log('New user: ' + socket.handshake.query.token);
        connectedUsers[socket.handshake.query.token] = socket;

        socket.on('disconnect', function() {
            console.log('Disconnect from: ' + socket.handshake.query.token);
            delete connectedUsers[socket.handshake.query.token];
        });
    }
});

redis.psubscribe('*', function (err, count) {
    console.log('Redis event');
});

redis.on('pmessage', function (subscribed, channel, data) {
    data = JSON.parse(data);
    if (data.token in connectedUsers) {
        console.log('New message to: ' + data.token);
        connectedUsers[data.token].emit(channel, data.message);
    }
});

*/
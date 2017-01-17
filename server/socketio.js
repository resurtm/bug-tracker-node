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

    socket.on('disconnect', () => {
        console.log('Disconnect');
    });

    socket.on('message', (data) => {
        socket.broadcast.emit('message', data);
    });
});

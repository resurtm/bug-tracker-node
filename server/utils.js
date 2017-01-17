import dotenv from 'dotenv'

dotenv.config();

export default {
    SOCKETIO_SERVER_HOST: process.env['SOCKETIO_SERVER_HOST'],
    SOCKETIO_SERVER_PORT: process.env['SOCKETIO_SERVER_PORT']
}

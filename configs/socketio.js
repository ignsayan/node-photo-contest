import { Server } from 'socket.io'
import http from 'http'
import { policy } from './cors.js'

const websocket = (app) => {

    const server = http.createServer(app);

    const io = new Server(server, {
        cors: policy,
    });

    return { server, io };
}

export default websocket

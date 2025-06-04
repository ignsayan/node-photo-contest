export const userSocket = (io) => {

    io.of('/user/stats').on('connection', async (socket) => {
        const data = {};
        socket.emit('user:stats', data);
        socket.on('disconnect', () => socket.disconnect(true));
    });
};

export default userSocket
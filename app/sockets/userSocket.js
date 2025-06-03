export const userSocket = (io) => {

    io.of('/user/dashboard').on('connection', async (socket) => {
        const data = {};
        socket.emit('user:dashboard', data);
        socket.on('disconnect', () => socket.disconnect(true));
    });
};

export default userSocket
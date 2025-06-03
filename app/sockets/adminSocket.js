import getOverviewAction from '../actions/admin/getOverviewAction.js'

export const adminSocket = (io) => {

    io.of('/admin/dashboard').on('connection', async (socket) => {
        const data = await getOverviewAction();
        socket.emit('admin:dashboard', data);
        socket.on('disconnect', () => socket.disconnect(true));
    });
};

export default adminSocket
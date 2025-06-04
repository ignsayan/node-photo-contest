import getAdminStatsAction from '../actions/admin/getAdminStatsAction.js'

export const adminSocket = (io) => {

    io.of('/admin/stats').on('connection', async (socket) => {
        const data = await getAdminStatsAction();
        socket.emit('admin:stats', data);
        socket.on('disconnect', () => socket.disconnect(true));
    });
};

export default adminSocket
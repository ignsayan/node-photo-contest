import getAdminDashboard from '../actions/admin/getAdminDashboard.js'

export const adminSocket = (io) => {

    io.of('/admin/dashboard').on('connection', async (socket) => {
        const data = await getAdminDashboard();
        socket.emit('admin:dashboard', data);
        socket.on('disconnect', () => socket.disconnect(true));
    });
};

export default adminSocket
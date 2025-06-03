import { responseHandler } from '../../services/index.js'
import registerAction from '../../actions/auth/registerAction.js'
import loginAction from '../../actions/auth/loginAction.js'
import logoutAction from '../../actions/auth/logoutAction.js'
import getAdminDashboard from '../../actions/admin/getAdminDashboard.js'
import { getIoInstance } from '../../../configs/socketio.js'


export const register = responseHandler(async (req) => {
    const { user, token } = await registerAction(req.body);
    const data = await getAdminDashboard();
    const io = getIoInstance();
    io.of('/admin/dashboard').emit('admin:dashboard', data);
    return {
        message: 'User created successfully',
        data: { user, token }
    };
});

export const login = responseHandler(async (req) => {
    const { user, token } = await loginAction(req.body);
    return {
        message: 'Login successful',
        data: { user, token }
    };
});

export const logout = responseHandler(async (req) => {
    await logoutAction(req.headers);
    return { message: 'Logout successful' };
});
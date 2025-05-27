import { responseHandler } from '../../services/index.js'
import registerAction from '../../actions/auth/registerAction.js'
import loginAction from '../../actions/auth/loginAction.js'

export const register = responseHandler(async (req) => {
    const user = await registerAction(req.body);
    return {
        message: 'User created successfully',
        data: { user }
    };
});

export const login = responseHandler(async (req) => {
    const { user, token } = await loginAction(req.body);
    return {
        message: 'Login successful',
        data: { user, token }
    };
});
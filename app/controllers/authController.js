import registerAction from '../actions/registerAction.js'
import loginAction from '../actions/loginAction.js'
import handler from '../utils/handler.js'


const register = handler(async (req) => {
    const user = await registerAction(req.body);
    return {
        status: 201,
        message: 'User created successfully',
        data: { user }
    };
});

const login = handler(async (req) => {
    const { token, user } = await loginAction(req.body);
    return {
        status: 200,
        message: 'Login successful',
        data: { user, token }
    };
});

export { register, login }
import registerAction from '../../actions/registerAction.js'
import loginAction from '../../actions/loginAction.js'

const register = async (req, res) => {
    try {
        const user = await registerAction(req.body);
        res.status(201).json({
            message: 'User created successfully',
            userId: user._id,
        });

    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ errors: { general: [error.message] } });
    }
}

const login = async (req, res) => {
    try {
        const { token, user } = await loginAction(req.body);
        return res.status(200).json({ message: 'Login successful', token, user });

    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ errors: { general: [error.message] } });
    }
}

export { register, login }
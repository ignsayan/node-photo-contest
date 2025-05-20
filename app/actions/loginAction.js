import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const loginAction = async (body) => {

    const { email, username, password } = body;
    const attribute = email ? email : username;

    const user = await User.findOne({
        $or: [
            { email: attribute },
            { username: attribute }
        ]
    });
    const isPasswordValid = user ? bcrypt.compare(password, user.password) : false;

    if (!user || !isPasswordValid) {
        const error = new Error('Invalid credentials');
        error.status = 422;
        throw error;
    }

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );

    return { user, token };
};

export default loginAction
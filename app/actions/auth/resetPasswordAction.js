import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import PasswordReset from '../../models/PasswordReset.js'
import User from '../../models/User.js'

const action = async (body) => {
    
    let { token, email, password } = body;

    // 1. find the user by email
    const user = await User.findOne({ email });
    if (!user) throw new Error('Invalid email');

    // 2. find reset token for that user
    const passwordReset = await PasswordReset.findOne({ user: user._id });
    if (!passwordReset) throw new Error('Invalid or expired token');

    // 3. check if token is expired
    if (passwordReset.expiry < Date.now()) {
        await PasswordReset.deleteOne({ _id: passwordReset._id });
        throw new Error('Token expired');
    }

    // 4. check if token is valid
    const isValidToken = await bcrypt.compare(token, passwordReset.token);
    if (!isValidToken) throw new Error('Invalid token');

    // 5. update user password
    const hash = await bcrypt.hash(password, 10);
    user.password = hash;
    await user.save();

    // 6. delete reset token
    await PasswordReset.deleteOne({ _id: passwordReset._id });

    token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    return { user, token };
};

export default action
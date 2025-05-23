import crypto from 'crypto'
import bcrypt from 'bcrypt'
import PasswordReset from '../../models/PasswordReset.js'
import template from '../../../emails/forgotPasswordEmail.js'
import transporter from '../../../configs/nodemailer.js'

const action = async (body) => {

    const { email, user } = body;

    const token = crypto.randomBytes(32).toString('hex');
    const hashedToken = await bcrypt.hash(token, 10);

    await PasswordReset.deleteMany({ user: user._id });
    await PasswordReset.create({
        user: user._id,
        token: hashedToken,
        expiry: Date.now() + 10 * 60 * 1000,
    });

    const route = '/reset-password';
    const link = `${process.env.FRONTEND_URL}/${route}?token=${token}&email=${email}`

    await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: 'Password Reset',
        html: template(link),
    });

    return;
};

export default action
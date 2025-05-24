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
    const passwordReset = await PasswordReset.create({
        user: user._id,
        token: hashedToken,
        expiry: Date.now() + 10 * 60 * 1000,
    });

    if (user && passwordReset) {
        const route = '/reset-password';
        const link = `${process.env.FRONTEND_URL}/${route}?token=${token}&email=${email}`

        const data = {
            name: user.first_name,
            link,
            time: passwordReset.expiry
        };

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: 'Password Reset',
            html: template(data),
        });
    }

    return;
};

export default action
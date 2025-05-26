import OTP from '../../models/OTP.js'
import User from '../../models/User.js'

const action = async (body) => {

    const { code, channel } = body;

    const otp = await OTP.findOne({ code, channel });
    if (!otp) throw new Error('Invalid OTP');

    const user = await User.findOne({ _id: otp.user });
    if (!user) throw new Error('No user found');

    if (channel === 'email') await user.markEmailAsVerified();
    if (channel === 'phone') await user.markPhoneAsVerified();

    await otp.deleteOne();
};

export default action
import User from '../../models/User.js'

const action = async (body) => {

    const { attribute, channel } = body;

    const user = await User.findOne({ [channel]: attribute });

    if (!user) {
        throw new Error('No user found with this record');
    }

    if (channel === 'email') await user.sendEmailVerification();
    if (channel === 'phone') await user.sendPhoneVerification();
};

export default action
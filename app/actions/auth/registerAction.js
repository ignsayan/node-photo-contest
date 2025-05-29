import User from '../../models/User.js'
import Role from '../../models/Role.js'
import { ROLE } from '../../../configs/constants.js'

const action = async (data) => {

    const { first_name, last_name, email, phone, password } = data;

    const username = email.split('@')[0] + Math.floor(Math.random() * 1000);

    const user = await User.create({
        first_name,
        last_name,
        username,
        email,
        phone,
        password,
    });

    const role = await Role.findOne({ name: ROLE.USER });
    user.roles.push(role._id);
    await user.save();

    return {
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        email_verified_at: user.email_verified_at,
        phone_verified_at: user.phone_verified_at,
    };
};

export default action

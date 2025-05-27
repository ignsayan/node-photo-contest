import User from '../../models/User.js'
import Role from '../../models/Role.js'
import bcrypt from 'bcrypt'

const action = async (data) => {

    let { first_name, last_name, email, phone, password } = data;

    phone = phone && phone.trim() !== '' ? phone : null;
    password = await bcrypt.hash(password, 10);

    const username = email.split('@')[0] + Math.floor(Math.random() * 1000);

    const user = await User.create({
        first_name,
        last_name,
        username,
        email,
        phone,
        password,
    });

    const role = await Role.findOne({ name: 'user' });

    user.roles.push(role._id);
    await user.save();

    return user;
};

export default action

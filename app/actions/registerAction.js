import User from '../models/User.js'
import Role from '../models/Role.js'
import bcrypt from 'bcrypt'

const registerAction = async (body) => {

    let { first_name, last_name, email, phone, password } = body;

    phone = phone && phone.trim() !== '' ? phone : null;
    password = await bcrypt.hash(password, 10);

    const user = await User.create({
        first_name,
        last_name,
        email,
        phone,
        password,
    });

    const role = await Role.findOneAndUpdate(
        { name: 'user' },
        { name: 'user' },
        { upsert: true, new: true }
    );

    user.roles.push(role._id);
    await user.save();

    return user;
};

export default registerAction

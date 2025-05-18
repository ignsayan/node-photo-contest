import User from '../models/User.js'
import Role from '../models/Role.js'
import bcrypt from 'bcrypt'

const registerAction = async (body) => {

    const { first_name, last_name, email, phone, password } = body;

    const existing = await User.findOne({ email });

    if (existing) {
        const error = new Error('Email already exists');
        error.status = 422;
        throw error;
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
        first_name,
        last_name,
        email,
        phone,
        password: hash,
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

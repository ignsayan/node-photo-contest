import User from '../app/models/User.js'
import Role from '../app/models/Role.js'
import bcrypt from 'bcrypt'

export default async function adminSeeder() {

    const password = await bcrypt.hash('chini@sussi', 10);

    let user = await User.findOne({ email: 'ayandey166@gmail.com' });

    if (!user) {
        user = await User.create({
            first_name: 'Super',
            last_name: 'Admin',
            email: 'ayandey166@gmail.com',
            phone: '9876543210',
            email_verified_at: new Date(),
            phone_verified_at: new Date(),
            password,
        });
    }

    const roles = await Role.find();
    user.roles = roles.map(role => role._id);

    await user.save();
};
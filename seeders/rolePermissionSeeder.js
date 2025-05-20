import Role from '../app/models/Role.js'

export default async function rolePermissionSeeder() {

    const data = [
        { name: 'admin' },
        { name: 'user' },
        { name: 'guest' },
    ];

    const roles = data.map(role => ({
        updateOne: {
            filter: { name: role.name },
            update: { $setOnInsert: role },
            upsert: true,
        }
    }));

    await Role.bulkWrite(roles);
};
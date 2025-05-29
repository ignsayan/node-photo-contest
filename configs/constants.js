import slugify from 'slugify'

const roles = {
    ADMIN: 'admin',
    USER: 'user',
};
const permissions = {
    CREATE: 'create',
    READ: 'read',
    UPDATE: 'update',
    DELETE: 'delete',
};

export const ROLE = Object.fromEntries(
    Object.entries(roles).map(([key, value]) => [
        key, slugify(value, { lower: true })
    ])
);
export const PERMISSION = Object.fromEntries(
    Object.entries(permissions).map(([key, value]) => [
        key, slugify(value, { lower: true })
    ])
);
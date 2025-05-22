import mongoose from 'mongoose'
import Permission from './Permission.js'
import Role from './Role.js'

const transform = (doc, rec) => {
    delete rec.password;
    delete rec.id;

    const attributes = (arr) =>
        Array.isArray(arr) ? arr.map(item => item.name) : [];

    if (rec.roles) {
        rec.roles = attributes(rec.roles);
    }
    if (rec.permissions) {
        rec.permissions = attributes(rec.permissions);
    }
    return rec;
};

const schema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        index: true,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        index: true,
        sparse: true,
        unique: null,
    },
    password: {
        type: String,
        required: true,
    },
    email_verified_at: {
        type: Date,
        default: null,
    },
    phone_verified_at: {
        type: Date,
        default: null,
    },
    remember_token: {
        type: String,
        default: null,
    },
    roles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: Role
    }],
    permissions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: Permission
    }],
}, {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true, transform },
    toObject: { virtuals: true, transform },
});

// eager loading with pre populate
schema.pre(/^find/, function () {
    this.populate('roles', 'name -_id')
        .populate('permissions', 'name -_id');
});

const User = mongoose.model('User', schema)
export default User
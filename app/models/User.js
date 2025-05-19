import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        sparse: true,
        unique: null,
    },
    password: {
        type: String,
        required: true,
    },
    remember_token: {
        type: String,
        default: null,
    },
    roles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    }],
    permissions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Permission'
    }],
}, {
    timestamps: true,
    versionKey: false,
    toJSON: {
        transform: (doc, rec) => {
            delete rec.password;
            return rec;
        }
    },
    toObject: {
        transform: (doc, rec) => {
            delete rec.password;
            return rec;
        }
    }
});

const User = mongoose.model('User', schema)
export default User